const blogsRouter = require('express').Router()
const { default: mongoose } = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user')
  
  res.json(blogs)
})

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }

  return null
}

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if (!decodedToken) {
    return res.statis(401).json({ error: 'token invalid' })
  }
  const tokenUser = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: tokenUser
  })

  tokenUser.blogs = tokenUser.blogs.concat(blog.id)
  await tokenUser.save()

  const result = await blog.save()

  res.status(201).json(result)
})

blogsRouter.delete('/:id', async (req, res) => {
  const result = await Blog.findByIdAndDelete(req.params.id)

  res.status(204).json(result)
})

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const newBlog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    id: id
  }

  const result = await Blog.findByIdAndUpdate(id, newBlog,
    { new: true}
  )

  res.status(201).json(result)
})

module.exports = blogsRouter