// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"; // Added the import React statement due to the, ReferenceError: React is not defined, during testing
import PropTypes from 'prop-types';
// import Togglable from "./Togglable";
// import { removeBlog, updateBlog } from "../blogRequests";
// import UserContext from "../reducers/UserContext";
import { useMutation, useQueryClient } from "react-query";

import axios from "axios";

const BlogView = ({ user, blog, updateHandler, deleteHandler }) => {
  user
  deleteHandler
  //const [visible, setVisible] = useState();
  //const comments = ["Comment 1", "Comment 2", "Comment 3", "Comment 4"];
  const blogStyle = {
    paddingLeft: 2,
    marginBottom: 5,
  };

  const increaseLikes = async (event) => {
    event;
    const newBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 };
    updateHandler(newBlog);
  };

  // const deletePost = async (event) => {
  //   if (confirm(`Delete ${blog.title} by ${blog.author}`)) {
  //     deleteHandler(blog.id);
  //   }
  // };

  const Comments = ({ comments, blogId }) => {
    const queryClient = useQueryClient();

    const updateCommentsMutation = useMutation(
      ({ comment }) =>
        axios.put(`http://localhost:3003/api/blogs/${blogId}/comments`, {
          comment,
        }),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("blogs");
        },
      },
    );

    const handleCommentUpdates = async (commentObject) => {
      updateCommentsMutation.mutate(commentObject);
    };

    return (
      <div style={{ margingTop: 10 }}>
        <h3>comments</h3>
        <CommentForm handleCommentUpdates={handleCommentUpdates} />
        <CommentList comments={comments} />
      </div>
    );
  };
  Comments.propTypes = {
    comments: PropTypes.array.isRequired,
    blogId: PropTypes.string.isRequired
  }

  const CommentList = ({ comments }) => {
    //if (!comments) comments = ['']
    let id = 0;
    return (
      <ul>
        {comments.map((comment) => (
          <li key={(id += 1)}>{comment}</li>
        ))}
      </ul>
    );
  };
  CommentList.propTypes = {
    comments: PropTypes.array.isRequired
  }

  const CommentForm = ({ handleCommentUpdates }) => {
    const [comment, setComment] = useState("");

    const addComment = (e) => {
      e.preventDefault();
      handleCommentUpdates({ comment });
      setComment("");
    };
    return (
      <form onSubmit={addComment}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">add comment</button>
      </form>
    );
  };

  CommentForm.propTypes = {
    handleCommentUpdates: PropTypes.func.isRequired
  }

  return (
    <div className="blogContainer" style={blogStyle}>
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
      <div>added by {blog.user.name}</div>
      <Comments comments={blog.comments} blogId={blog.id} />
    </div>
  );
};

BlogView.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  updateHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired
}

export default BlogView;

