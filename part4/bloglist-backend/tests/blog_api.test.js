const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'He acted as Mr Bean',
    author: 'Rowan Atkinson',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 17,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
]

beforeEach(async () => {

await Blog.deleteMany({})
await Blog.insertMany(initialBlogs)

})

test('the correct ammout of blogs are returned as json', async () =>{
  const blogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(blogs.body).toHaveLength(initialBlogs.length)
})

test('uniq identifier is named id', async () => {
  const blogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(blogs.body[0]["id"]).toBeDefined()
})

test('making a post request successfully creates a new blog', async () => {

  const dummyBlogPost =   {
    title: 'This is a test blog post',
    id: '6500a804928ff98e8e9dfc14',
    author: 'My New Audio Friend',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 17,
  }
  
  await api
    .post('/api/blogs')
    .send(dummyBlogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await api.get('/api/blogs')
  const blogs_db = await Blog.find({})
  //This method allows the use of fomatted id in the resulting blog object
  const blogs_db_json = blogs_db.map(blog => blog.toJSON())
  expect(blogs_db_json).toHaveLength(initialBlogs.length+1)
  expect(blogs_db_json).toContainEqual(dummyBlogPost)
})

test('missing likes property causes the value 0 to be saved in the database', async () => {
  const dummyBlogPost =  {
    title: 'This is a test blog post',
    id: '6500a804928ff98e8e9dfc14',
    author: 'My New Audio Friend',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  }

  await api
    .post('/api/blogs')
    .send(dummyBlogPost)
    .expect(201)

  const blogs_db = await Blog.find({_id: '6500a804928ff98e8e9dfc14'})
  expect(blogs_db[0].likes).toEqual(0)
})

test('missing title results in error 400 and failure to save to database ', async () => {
  const dummyBlogPost =  {
    id: '6500a804928ff98e8e9dfc14',
    author: 'My New Audio Friend',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  }

  await api
    .post('/api/blogs')
    .send(dummyBlogPost)
    .expect(400)

  //const blogs_db = await Blog.find({_id: '6500a804928ff98e8e9dfc14'})
  //expect(blogs_db[0].likes).toEqual(0)
})

afterAll(async () => {
  await mongoose.connection.close()
})