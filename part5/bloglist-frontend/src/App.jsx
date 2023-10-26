import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import { useRef } from 'react'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationColor, setNotificationColor] = useState('red')
  const [creationFormVisibility, setCreationFormVisibility] = useState(false)

  const blogFormRef = useRef()
  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
      })  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    }catch(error){
      console.log(error)
      displayNotification('wrong username or password', 'red')
    }

  }

  const handleBlogUpdates = async (id, blogObject) => {
    console.log(id)
    const returnedBlog = await blogService.update(id, blogObject)
    setBlogs(blogs.map(
      blog => (blog.id !== id ? blog: returnedBlog)
    ))
    console.log(returnedBlog)

  }

  const handleBlogDeletion = async (id) => {
    const response = await blogService.remove(id)
    if(response.status === 204){
      setBlogs(blogs.filter(
        blog => blog.id !== id 
      ))
    }

  }

  const handleBlogCreation = async (blogObject) => {
  
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    displayNotification(`An new blog ${returnedBlog.title} by ${returnedBlog.author} added `, 'green')
    
    blogFormRef.current.toggleVisibility()

  }

  const displayNotification = (msg, color) => {
    setNotificationColor(color)
    setErrorMessage(msg)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const Notification = ({ message, notificationColor}) => {

    const notificationStyle = {
      color: notificationColor,
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      margiBottom: 10,
    }
  
    if (message === null) {
      return null
    }
  
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }

  const logout = () => {
    setUser(null)
    window.localStorage.clear()

  }

  const loginForm = () => {
    return (
      <> 
        <h2>log in to application</h2>
        <Notification message={errorMessage} notificationColor={notificationColor}/>
        <form onSubmit={handleLogin}>
          <div>
            username: <input id='username' type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div>
            password: <input id='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button id='login-button' type="submit">log in</button>
        </form>
      </>
    )
  }

  const blogsSection = () => {
    return(
      <>
        <h2>blogs</h2>
        <Notification message={errorMessage} notificationColor={notificationColor}/>
        <div>
          {user.name} logged in
          <button onClick={() => logout()}>logout</button>
        </div>
        <br/>

{/*         {!creationFormVisibility && 
          <button onClick={() => setCreationFormVisibility(true)}>
            create new blog
          </button>
        }
        {creationFormVisibility && 
        <div>
          <BlogForm create={handleBlogCreation}/>
          <button onClick={() => setCreationFormVisibility(false)}>cancel</button>
        </div>
        } */}

        <Togglable buttonLabel={'create blog'} ref={blogFormRef}>
          <BlogForm create={handleBlogCreation}/>
        </Togglable>

        
        {blogs
          .sort((a,b) => b.likes-a.likes)
          .map(blog =>
          <Blog 
            key={blog.id} 
            user={user}
            blog={blog} 
            updateHandler={handleBlogUpdates} 
            deleteHandler={handleBlogDeletion}
          />
        )}
      </>
    )
  }



  return (
  <>
    {!user && loginForm()}
    {user && blogsSection()}
  </>
  )
}

export default App