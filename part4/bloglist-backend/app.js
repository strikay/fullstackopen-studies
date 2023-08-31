const express = require('express')
const blogRouter = require('./controllers/blogs')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const mongoUrl = 'mongodb://127.0.0.1:27017/bloglist'
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app