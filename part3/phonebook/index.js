const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const Person = require('./models/person')

const app = express()
app.use(express.json())

app.use(morgan('tiny'))
morgan.token('req-body', function (req) {
  return JSON.stringify(req.body)
})
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :req-body'
  )
)

app.use(express.static('dist'))

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons)
    })
    .catch((error) => next(error))
})

app.get('/info', (request, response, next) => {
  const date = new Date()
  Person.countDocuments({})
    .then((personCount) => {
      response.send(`
            <p>Phonebook has info for ${personCount} people</p>
            <p>${date}</p>
        `)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).send({ error: 'Person not found' })
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then((result) => {
      console.log('Deleted person with id:', id)
      if (result) {
        response.status(204).end()
      } else {
        response.status(404).send({ error: 'Person not found' })
      }
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const newPerson = new Person({ ...request.body })

  if (!newPerson.name || !newPerson.number) {
    return response.status(400).json({ error: 'Name or number is missing' })
  }

  Person.findOne({ name: newPerson.name })
    .then((existingPerson) => {
      if (existingPerson) {
        return response.status(400).json({ error: 'Name must be unique' })
      }
      console.log('Added new person:', newPerson)

      newPerson
        .save().then((savedPerson) => {
          response.status(200).json(savedPerson)
        })
        .catch((error) => next(error))
    })
    .catch((error) => {
      console.error('Error checking for existing person:', error.message)
      return response
        .status(500)
        .send({ error: 'Failed to check for existing person' })
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const updatedPerson = request.body
  if (!updatedPerson.name || !updatedPerson.number) {
    return response.status(400).json({ error: 'Name or number is missing' })
  }
  Person.findByIdAndUpdate(id, updatedPerson, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updated) => {
      if (updated) {
        response.json(updated)
      } else {
        response.status(404).send({ error: 'Person not found' })
      }
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
