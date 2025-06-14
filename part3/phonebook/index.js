const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.json());

app.use(morgan('tiny'));
morgan.token('req-body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));

app.use(express.static('dist'));

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]




app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/info', (request, response) => {
    const date = new Date();
    const personCount = persons.length;
    response.send(`
        <p>Phonebook has info for ${personCount} people</p>
        <p>${date}</p>
    `);
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(p => p.id === id);
    
    if (person) {
        response.json(person);
    } else {
        response.status(404).send({ error: 'Person not found' });
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const index = persons.findIndex(p => p.id === id);
    
    if (index !== -1) {
        persons.splice(index, 1);
        response.status(204).end();
    } else {
        response.status(404).send({ error: 'Person not found' });
    }
});



const getRandomId = () => {
    return (Math.random() * 10000).toFixed(0);
};

app.post('/api/persons', (request, response) => {
    const newPerson = { ...request.body };

    if (!newPerson.name || !newPerson.number) {
        return response.status(400).json({ error: 'Name or number is missing' });
    }

    if (persons.some(p => p.name === newPerson.name)) {
        return response.status(400).json({ error: 'Name must be unique' });
    }
    console.log('Added new person:', newPerson);
    newPerson.id = getRandomId();
    persons = persons.concat(newPerson);
    
    response.status(200).json(newPerson);
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
