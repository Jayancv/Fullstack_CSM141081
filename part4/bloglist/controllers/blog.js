const express = require('express')

const Blog = require('../models/blog')
const router = express.Router()


router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

router.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

router.delete('/:id', async (request, response) => {
  const { id } = request.params
  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  const { id } = request.params
  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    request.body,
    { new: true, runValidators: true, context: 'query' }
  )
  response.json(updatedBlog)
})


module.exports = router