require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()
app.use(express.json())
app.use(cors())

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))
app.use(express.static('build'))

app.get('/api/persons', (request, response) => {
  let persons = []
  Person.find({})
    .then(result => {
      persons = [...result]
      response.json(persons)
    })
    .catch(error=>{
      console.log(error.message)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person
    .findById(request.params.id)
    .then(person =>{
      if(person){
        response.json(person)
      }else{
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
  let persons = []

  Person
    .find({})
    .then(result => {
      persons = [...result]
      const date = new Date();
      res.set('Content-Type', 'text/html')
      res.send('Phonebook has info for '+persons.length+' people<br/><br/>'+date)
    })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => {
    console.log(error.message)
  })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if(!(body.name&&body.number)){
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  let persons = []

  Person
    .find({})
    .then(result => {
      persons = [...result]
    })

  let nameExists = (persons.map(person => person.name)).includes(body.name)
  if(nameExists){
    return response.status(409).json({ 
      error: 'name aleardy exists'
    })
  }

  const person = new Person({
      name: body.name,
      number: body.number,
  })

  person
    .save()
    .then(result => {
        response.json(result)
    })
    .catch(error => next(error))
  
})

app.put('/api/persons/:id', (request, response, next) => {
  const {name, number} = request.body

  Person.findByIdAndUpdate(request.params.id, {name, number}, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
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
    return response.status(400).send({ error: error.message })
  } 
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
