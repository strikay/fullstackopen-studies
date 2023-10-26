
import  React, { useState } from "react" // Added the import React statement due to the, ReferenceError: React is not defined, during testing
import Togglable from "./Togglable"

const Blog = ({ user, blog, updateHandler, deleteHandler }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const increaseLikes = async (event) => {
    const newBlog = {...blog, user: blog.user.id, likes: blog.likes+1}
    await updateHandler(blog.id, newBlog)
  }

  const deletePost = async (event) => {
    if(confirm(`Delete ${blog.title} by ${blog.author}`)){
      await deleteHandler(blog.id)
    }
  }

  console.log(blog)
  return (
    <div className="blogContainer" style={blogStyle} >
      <span className="blog">
          {blog.title} {blog.author}
      </span>

      <button onClick={() => {setVisible(!visible)}}>
        {visible ? 'hide': 'view'}
      </button>

      {visible && <div className="blogContent" style={{display: !visible?'none':null}}>
        <div className="url">
          {blog.url}
        </div>
        <div className="likes"> 
          likes {blog.likes} 
          <button onClick={increaseLikes}>like</button>
        </div>
        <div> 
          {blog.user.name} 
        </div>
        {
          (user.username === blog.user.username) &&
          <button onClick={deletePost}>remove</button>
        }
      
      </div>}
    </div>  
  )
}
export default Blog