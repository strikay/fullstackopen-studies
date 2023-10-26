const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogRouter.get('/', async (request, response) => {
  //console.log(request.body)
  const blogs = await Blog.find({}).populate('user', {username:1, name:1})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  let body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  
  const blog = new Blog({
    id: body.id,
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const returned_blog = await Blog.findById(savedBlog._id).populate('user', {username:1, name:1})

  response.status(201).json(returned_blog)
})

blogRouter.delete('/:id', async (request, response) => {
  const token = request.token

  const blog = await Blog.findById(request.params.id).populate('user', {blogs:0, password:0})
  const userFromBlog = blog.user

  if(!blog){
    return response.status(400).json('blog not available')
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if(!decodedToken.id){
    return response.status(401).json('invalid token')
  }
  
  const userFromToken = await User.findById(decodedToken.id)
  if(!(userFromBlog.id.toString() === userFromToken.id.toString())){
    return response.status(401).send()
  }
 
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const newBlog = {
    title, 
    url, 
    author, 
    likes, 
    user
  } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
  
  const returned_blog = await Blog.findById(updatedBlog._id).populate('user', {username:1, name:1})

  response.json(returned_blog)
})

module.exports = blogRouter