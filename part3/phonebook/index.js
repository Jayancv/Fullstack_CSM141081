const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const Person = require('./models/person');

const app = express();
app.use(express.json());

app.use(morgan('tiny'));
morgan.token('req-body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));

app.use(express.static('dist'));

app.get('/api/persons', (request, response) => {
    Person.find({}).then( (persons) => {
        response.json(persons);
        })
        .catch(error => {
            console.error('Error fetching persons:', error.message);
            response.status(500).send({ error: 'Failed to fetch persons' });
        });
});

app.get('/info', (request, response) => {
    const date = new Date();
    Person.countDocuments({}).then(personCount => {
        response.send(`
            <p>Phonebook has info for ${personCount} people</p>
            <p>${date}</p>
        `);
    }).catch(error => {
        console.error('Error fetching person count:', error.message);
        response.status(500).send({ error: 'Failed to fetch person count' });
    });
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    Person.findById(id).then(person => {
        if (person) {
            response.json(person);
        } else {
            response.status(404).send({ error: 'Person not found' });
        }
    }).catch(error => {
        console.error('Error fetching person:', error.message);
        response.status(500).send({ error: 'Failed to fetch person' });
    });
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    Person.findByIdAndDelete(id).then(result => {
        console.log('Deleted person with id:', result);
        if (result) {
            response.status(204).end();
        } else {
            response.status(404).send({ error: 'Person not found' });
        }
    }).catch(error => {
        console.error('Error deleting person:', error.message);
        response.status(500).send({ error: 'Failed to delete person' });
    });
});
    
const getRandomId = () => {
    return (Math.random() * 10000).toFixed(0);
};

app.post('/api/persons', (request, response) => {
    const newPerson = new Person({ ...request.body });
    newPerson.id = getRandomId();

    if (!newPerson.name || !newPerson.number) {
        return response.status(400).json({ error: 'Name or number is missing' });
    }

    // Person.findOne({ name: newPerson.name }).then(existingPerson => {
    //     if (existingPerson) {
    //         return response.status(400).json({ error: 'Name must be unique' });
    //     } 
    // }).catch(error => {
    //     console.error('Error checking for existing person:', error.message);
    //     return response.status(500).send({ error: 'Failed to check for existing person' });
    // });
    console.log('Added new person:', newPerson);

    newPerson.save().then(savedPerson => {
        response.status(200).json(savedPerson);
    }).catch(error => {
        console.error('Error adding person:', error.message);
        response.status(500).send({ error: 'Failed to add person' });
    });
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
