const _ = require('lodash')
const logger = require('./logger')

const dummy = (blogs) => {
  logger.info(blogs)
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.map((blog) => (sum += blog.likes))
  return sum
}

const favoriteBlog = (blogs) => {
  if (!blogs.length) {
    return 'No blogs found!'
  }
  return blogs.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  )
}

const mostBlogs = (blogs) => {
  if (!blogs.length) {
    return 'No blogs found!'
  }

  const authors = blogs.map((blog) => {
    return _.pick(blog, 'author')
  })
  logger.info('authors', authors)

  const groupByAuthor = _.groupBy(authors, 'author')
  logger.info('groupByAuthor: ', groupByAuthor)

  const mostBlogs = _.reduce(groupByAuthor, (prev, current) =>
    prev.length > current.length ? prev : current
  )
  logger.info('mostBlogs', mostBlogs)

  return { author: mostBlogs[0].author, blogs: mostBlogs.length }
}

const mostLikes = (blogs) => {
  if (!blogs.length) {
    return 'No blogs found!'
  }

  const authorsAndLikes = blogs.map((blog) => {
    return _.pick(blog, ['author', 'likes'])
  })
  logger.info('authorsAndLikes', authorsAndLikes)

  const groupByAuthor = _.groupBy(authorsAndLikes, 'author')
  logger.info('groupByAuthor: ', groupByAuthor)

  const result = _.map(groupByAuthor, (individualAuthor) => {
    logger.info('individualAuthor: ', individualAuthor)
    let authorLikes = 0
    individualAuthor.forEach((item) => (authorLikes += item.likes))

    return { author: individualAuthor[0].author, likes: authorLikes }
  })
  logger.info('most likes final result', _.maxBy(result, 'likes'))

  return _.maxBy(result, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
