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

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122" 
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if(person){
    response.json(person)
  }else{
    response.status(404).end()
  }
})

app.get('/info', (req, res) => {
  const date = new Date();
  res.set('Content-Type', 'text/html')
  res.send('Phonebook has info for '+persons.length+' people<br/><br/>'+date)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!(body.name&&body.number)){
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const persons = []

  Person.find({}).then(result => {
    result.forEach(person => {
      persons.concat(person)
    })
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

  person.save().then(result => {
      response.json(newPerson)
      mongoose.connection.close()
  })
  
})

const PORT = process.env.PORT
app.listen(PORT)
