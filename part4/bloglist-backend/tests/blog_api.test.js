const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const {
  initialBlogs, 
  exampleUsers, 
  authenticatedUsers, 
  addUsers, 
  loginUsers, 
  addBlogs,
  blogsInDb
} = require('./test_helper')

let bloggingUser 
let regularUser

beforeEach(async () => {

  await User.deleteMany({})

  await addUsers(api)
  await loginUsers(api)
  bloggingUser = authenticatedUsers[0]
  regularUser = authenticatedUsers[1]

  await Blog.deleteMany({})
  await addBlogs(bloggingUser)

})

describe('when there is initially some blogs saved', () => {
  test('the correct ammout of blogs are returned as json', async () =>{
    const blogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    expect(blogs.body).toHaveLength(initialBlogs.length)
  })
  
  test('unique identifier in each blog is named id', async () => {
    const blogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    expect(blogs.body[0]["id"]).toBeDefined()
  })
})

describe('addition of a new blog', () => {

  test('succeeds with valid data', async () => {
    const dummyBlogPost =   {
      title: 'This is a test blog post',
      id: '6500a804928ff98e8e9dfc14',
      author: 'My New Audio Friend',
      user: bloggingUser.id,
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 17,
    }
    
    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer '+bloggingUser.token)
      .send(dummyBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    let blogs = (await blogsInDb()).map(blog => blog.title)
  
    expect(blogs).toHaveLength(initialBlogs.length+1)
    expect(blogs).toContainEqual(dummyBlogPost.title)
  })
  
  test('uses default likes value of 0 if not given', async () => {
    
    const dummyBlogPost =  {
      title: 'This is a test blog post',
      id: '6500a804928ff98e8e9dfc14',
      user: bloggingUser.id,
      author: 'My New Audio Friend',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer '+bloggingUser.token)
      .send(dummyBlogPost)
      .expect(201)
  
    const blogs_db = await Blog.find({_id: '6500a804928ff98e8e9dfc14'})
    expect(blogs_db[0].likes).toEqual(0)
  })
  
  test('fails with error 400 if the title is missing', async () => {
    const dummyBlogPost =  {
      id: '6500a804928ff98e8e9dfc14',
      author: 'My New Audio Friend',
      user: bloggingUser.id,
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer '+bloggingUser.token)
      .send(dummyBlogPost)
      .expect(400)
  })

  test('fails with status code 401 if user is not authenticated', async () => {
  
    const dummyBlogPost =   {
      title: 'This is a test blog post',
      id: '6500a804928ff98e8e9dfc14',
      author: 'My New Audio Friend',
      user: bloggingUser.id,
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 17,
    }
    
    await api
      .post('/api/blogs')
      .send(dummyBlogPost)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  
    let blogs = (await blogsInDb()).map(blog => blog.title)
  
    expect(blogs).toHaveLength(initialBlogs.length)
    expect(blogs).not.toContainEqual(dummyBlogPost.title)
  })
})

describe('deletion of a blog post', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'Bearer '+bloggingUser.token)
      .expect(204)
  
      const blogsAtEnd = await blogsInDb()
      expect(blogsAtEnd).toHaveLength(initialBlogs.length-1)
  })
})

describe('blog post update', () => {
  test('is succeeds for likes property updates', async () => {

    let blogsAtStart = await blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog = {...blogToUpdate, likes:blogToUpdate.likes+1}
  
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
  
      let blogsAtEnd = await blogsInDb()
      expect(blogsAtEnd).not.toContainEqual(blogToUpdate)
      expect(blogsAtEnd).toContainEqual(updatedBlog)
      expect(blogsAtEnd[0].likes).toEqual(blogToUpdate.likes+1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})