import { useState, useEffect, useReducer, useContext } from 'react'
import Blog from './components/BlogView'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { useRef } from 'react'
import NotificationContext from './reducers/NotificationContext'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import blogRequests, { createBlog, getBlogs, removeBlog, updateBlog } from './blogRequests'
import UserContext from './reducers/UserContext'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import User from './components/User'
import { getUsers } from './userRequests'


const App = () => {
  const [notification, dispatchNotification] = useContext(NotificationContext)
  const [creationFormVisibility, setCreationFormVisibility] = useState(false)
  const queryClient = useQueryClient()
  const [user, dispatchUser] = useContext(UserContext)
  const setUser = user => dispatchUser({type:'SET_USER', payload:user})

  //let blogs
  //const setBlogs = (b) => blogs = b

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogRequests.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {

    try{
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogRequests.setToken(user.token)
      return 'success'

    }catch(error){
      displayNotification('wrong username or password', 'red')
      return 'error'
    }
  }

  const displayNotification = (message, color) => {
    console.log(message)
    dispatchNotification({
      type: 'SET_NOTIFICATION',
      payload: {
        message, color
      }
    })
    setTimeout(() => {
      dispatchNotification({
        type: 'REMOVE_NOTIFICATION',
      })
    }, 5000)
  }

  const Header = ({label}) => (
    <>
      <h2>{label}</h2>
      <Notification />
    </>
  )

  const NavMenu = ({handleLogout, name}) => (
    <div>
        <div style={{
          background: 'lightgrey',
          padding:4
        }}>
          <Link to='/'>blogs</Link>{' '}
          <Link to='/users'>users</Link>{' '}
          {name} logged in {' '}
          <button onClick={handleLogout}>logout</button>
        </div>
        <h2>blog app</h2>
    </div>
  )

  const Users = () => {
    const result = useQuery(
      'users',
      getUsers
    )

    if(result.isLoading) return <div>still loading</div>
    const users = result.data

    return (
      <Routes>
        <Route path='/' element={<UserList users={users}/>}/>
        <Route path='/:id' element={<UserViewContainer users={users}/>}/>
      </Routes>
    )
  }

  const UserViewContainer = ({users}) => {
    const id = useParams().id
    const user = users.find(n => n.id === id) 

    return (
      <UserView user={user}/>
    )
  }

  const UserView = ({user}) => {

    const blogs = user.blogs
    return(
      <div>
        <h2>{user.name}</h2>
        <h4>added blogs</h4>
        <ul>
            {
              blogs.map(blog => 
                <li key={blog.id}>{blog.title}</li>
              )
            }
          </ul>
      </div>
    )
  }

  const UserList = ({users}) => {

    return (
      <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => 
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
          )}
        </tbody>
      </table>
      </>
    )
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const ContentSection = ({handleLogout}) => {

    const [user, dispatchUser] = useContext(UserContext)

    return(
      <Router>
        <NavMenu handleLogout={handleLogout} name={user.name}/>
        <Routes>
          <Route path='/*' element={<Blogs/>}/>
          <Route path='/users/*' element={<Users/>}/>
        </Routes>
      </Router>
    )
  }
 
  return (
  <>
    {!user && <LoginForm handleLogin={handleLogin}/>}
    {user && <ContentSection handleLogout={handleLogout}/> }
  </>
  )
}

export default App