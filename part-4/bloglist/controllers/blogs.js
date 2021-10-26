const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const jwt = require('jsonwebtoken')

// NOT IN USE
/*
const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
*/

// Get all blog posts
blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

// Get a blog post by id
blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        //response.json(blog.toJSON())
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

// Post a blog post
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  // get token from request object
  const token = request.token
  // get the user from request object
  const user = request.user

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (!body.title || !body.url) {
      return response
        .status(400)
        .send({ message: 'Blog title or url is missing' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes | 0,
      user: user._id,
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

// Update a blog post
blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    })
    response.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

// Delete a blog post
blogsRouter.delete('/:id', async (request, response, next) => {
  const token = request.token
  const user = request.user

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response
        .status(404)
        .json({ message: `Blog with id ${request.params.id} not found` })
    }

    if (blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      return response.status(204).end()
    }
    return response.status(403).json({
      message: `You are not authorized to delete the blog ${blog._id} `,
    })
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
