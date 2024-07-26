const blogsRouter = require('express').Router()
const { default: mongoose } = require('mongoose')
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)

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