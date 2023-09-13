const express = require('express')
require('express-async-errors')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app