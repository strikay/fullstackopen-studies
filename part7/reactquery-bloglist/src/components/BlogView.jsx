
import  React, { useContext, useState } from "react" // Added the import React statement due to the, ReferenceError: React is not defined, during testing
import Togglable from "./Togglable"
import { useMutation, useQueryClient } from "react-query"
import { removeBlog, updateBlog } from "../blogRequests"
import UserContext from "../reducers/UserContext"
import axios from "axios"

const BlogView = ({ user, blog, updateHandler, deleteHandler }) => {
  const [visible, setVisible] = useState()
  const comments = [
    'Comment 1',
    'Comment 2',
    'Comment 3',
    'Comment 4',
  ]
  const blogStyle = {
    paddingLeft: 2,
    marginBottom: 5
  }

  const increaseLikes = async (event) => {
    const newBlog = {...blog, user: blog.user.id, likes: blog.likes+1}
    updateHandler(newBlog)
  }

  const deletePost = async (event) => {
    if(confirm(`Delete ${blog.title} by ${blog.author}`)){
    deleteHandler(blog.id)
    }
  }

  const Comments = ({comments, blogId}) => {
    const queryClient = useQueryClient()

    const updateCommentsMutation = useMutation(
      ({comment}) => axios.put(`http://localhost:3003/api/blogs/${blogId}/comments`, {comment})
      , {
      onSuccess: () => {
        queryClient.invalidateQueries('blogs')
      },
  })

    const handleCommentUpdates = async (commentObject) => {
        updateCommentsMutation.mutate(commentObject)
    }

    return (
      <div style={{margingTop:10}}>
        <h3>comments</h3>
        <CommentForm handleCommentUpdates={handleCommentUpdates}/>
        <CommentList comments={comments}/>
      </div>
    )
  }

  const CommentList = ({comments}) => {
    //if (!comments) comments = ['']
    let id = 0
    return (
      <ul>
          {comments.map(comment =>
            <li key={id+=1}>{comment}</li>
          )}
      </ul>
    )
  }

  const CommentForm = ({handleCommentUpdates}) => {
    const [comment, setComment] = useState('')

    const addComment = (e) => {
      e.preventDefault()
      handleCommentUpdates({comment})
      setComment('')
    }
    return(
      <form onSubmit={addComment}>
        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>
        <button type="submit">add comment</button>
      </form>
    )
  }



  return (
    <div className="blogContainer" style={blogStyle} >
      <h2 className="blog-title">
          {blog.title} {blog.author}
      </h2>
      <a href={blog.url} className="url">
        {blog.url}
      </a>
      <div className="likes"> 
        likes {blog.likes} 
        <button onClick={increaseLikes}>like</button>
      </div>
      <div> 
        added by {blog.user.name} 
      </div>
      <Comments comments={blog.comments} blogId={blog.id}/>
    </div>  
  )
}
export default BlogView