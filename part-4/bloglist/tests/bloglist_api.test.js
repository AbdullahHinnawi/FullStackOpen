const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/Blog')
const bcrypt = require('bcrypt')
const User = require('../models/User')

// Before each
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('salainen', 10)
  const newUser = {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    passwordHash,
  }

  const userObject = new User(newUser)
  const savedUser = await userObject.save()

  let blogObject = new Blog(helper.initialBlogs[0])
  blogObject.user = savedUser._id
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  blogObject.user = savedUser._id
  await blogObject.save()
})

test('all blog posts are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog post has an id property', async () => {
  const blogs = await helper.blogsInDb()
  blogs.map((blog) => expect(blog.id).toBeDefined())
})

test('a valid blog post can be added', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  }

  const credentials = {
    username: 'mluukkai',
    password: 'salainen',
  }

  const loginResponse = await api.post('/api/login').send(credentials)

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: `bearer ${loginResponse.body.token}` })
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const blogTitles = blogsAtEnd.map((b) => b.title)
  expect(blogTitles).toContain(newBlog.title)
})

test('adding a blog fails if a token is not provided', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  const blogTitles = blogsAtEnd.map((b) => b.title)
  expect(blogTitles).not.toContain(newBlog.title)
})

test('if the likes property is missing, it will default to the value 0', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  }

  const credentials = {
    username: 'mluukkai',
    password: 'salainen',
  }
  const loginResponse = await api.post('/api/login').send(credentials)

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: `bearer ${loginResponse.body.token}` })

  expect(response.body.likes).toBe(0)
})

test('adding a blog fails if the title or url properties are missing', async () => {
  const newBlog = {
    title: '',
    author: 'Edsger W. Dijkstra',
    url: '',
  }

  const credentials = {
    username: 'mluukkai',
    password: 'salainen',
  }
  const loginResponse = await api.post('/api/login').send(credentials)

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: `bearer ${loginResponse.body.token}` })
  expect(response.status).toBe(400)
})

test('if a blog post deleted, expect response with status code 204', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  const credentials = {
    username: 'mluukkai',
    password: 'salainen',
  }
  const loginResponse = await api.post('/api/login').send(credentials)

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set({ Authorization: `bearer ${loginResponse.body.token}` })
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const blogTitles = blogsAtEnd.map((blog) => blog.title)
  expect(blogTitles).not.toContain(blogToDelete.title)
})

test('a blog post can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  let blogToUpdate = blogsAtStart[0]

  const likesBeforeUpdate = blogToUpdate.likes

  blogToUpdate = { ...blogToUpdate, likes: blogToUpdate.likes + 5 }

  const likesAfterUpdate = likesBeforeUpdate + 5

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate)

  const blogsAtEnd = await helper.blogsInDb()

  //The filter method creates a new array with all elements that pass the test implemented by the provided function
  const result = blogsAtEnd.filter((blog) => blog.id === blogToUpdate.id)
  expect(result[0].likes).toBe(likesAfterUpdate)
})

afterAll(() => {
  mongoose.connection.close()
})
