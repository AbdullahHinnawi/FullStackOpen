const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.username || !body.password) {
    return response
      .status(400)
      .json({ error: 'Username or password is missing' })
  }
  if (body.password.length < 3) {
    return response
      .status(400)
      .json({ error: 'Password must be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  try {
    const savedUser = await user
      .save()
      .catch((error) => response.status(500).json({ error: error.message }))
    response.status(201).json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/', async (_request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
  })

  if (!users) {
    return response.status(404).end()
  }

  response.status(200).json(users)
})

module.exports = usersRouter
