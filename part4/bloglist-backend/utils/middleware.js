const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
const errorHandler = (error, request, response, next) => {

    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }

  const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
  
    if(authorization&&authorization.startsWith('Bearer ')){
      request.token = authorization.replace('Bearer ', '')
    }else{
      request.token = null
    }
  
    next()
  }
  const userExtractor = async (request, response, next) => {


    if(request.token){
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      const user = await User.findById(decodedToken.id)
      request.user = user
    }else{
      request.token = null
    }
  
    next()
  }
  
  module.exports = {
    errorHandler,
    unknownEndpoint,
    tokenExtractor,
    userExtractor
  }