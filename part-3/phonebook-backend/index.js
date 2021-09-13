const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

const morganMiddleware = (tokens, req, res) => {
  const body = req.body
  const tiny = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
  ].join(' ')

  if (JSON.stringify(body) !== '{}') {
    return tiny.concat(' ', JSON.stringify(body))
  }
  return tiny
}

app.use(morgan(morganMiddleware))

/*  No need to use hardcoded persons anymore
let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];
*/

app.get('/', (_req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (_req, res, next) => {
  Person.find({})
    .then((persons) => {
      const info = `<div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
      </div>`
      res.send(info)
    })
    .catch((error) => next(error))
})

app.get('/api/persons', (_req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (!person) {
        return res.status(404).end()
      }
      return res.json(person)
    })
    .catch((error) => next(error))
})

/*  No need to use this function anymore
const generateId = () => {
  //generate id between 0 and 1000000
  const newId = Math.floor(Math.random() * 1000000)
  const found = persons.find((p) => p.id === newId)
  if (found) {
    return generateId()
  }
  return newId
}
*/

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  console.log('body', body)

  if (!body.name) {
    res.status(400).json({
      error: 'name missing',
    })
  }
  if (!body.number) {
    res.status(400).json({
      error: 'phone number missing',
    })
  }

  const person = new Person({
    //id: generateId(), // MongoDB generates an id automatically
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((error) => next(error))

  // Another way for unique name validation
  /*
  Person.find({ name: body.name })
    .then((returnedArray) => {
      console.log('returnedArray ', returnedArray);
      if (returnedArray.length) {
        return res.status(400).json({ error: 'name must be unique' });
      }
      const person = new Person({
        //id: generateId(), // MongoDB generates an id automatically
        name: body.name,
        number: body.number,
      });
      person
        .save()
        .then((savedPerson) => res.json(savedPerson))
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
    */
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number,
  }
  console.log('req.body', req.body)
  console.log('req.params.id', req.params.id)

  Person.findById(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).end()
      }

      /*
      By default, the updatedPerson parameter of the event handler receives the original document without the modifications. We added the optional { new: true } parameter, which will cause our event handler to be called with the new modified document instead of the original.
      */
      Person.findByIdAndUpdate(req.params.id, person, {
        new: true,
        runValidators: true,
      })
        .then((updatedPerson) => {
          res.json(updatedPerson)
        })
        .catch((error) => next(error))
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      console.log(result)
      res.status(204).end()
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, _request, response, next) => {
  console.error(error.message)
  console.log(error.name)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

// handler of requests with result to errors
// errorHandler has to be the last loaded middleware
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
