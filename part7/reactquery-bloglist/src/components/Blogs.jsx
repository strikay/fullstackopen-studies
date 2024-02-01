import { useMutation, useQuery, useQueryClient } from 'react-query';
import PropTypes from 'prop-types';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import { createBlog, getBlogs, removeBlog, updateBlog } from '../blogRequests';
import { useContext, useRef } from 'react';
import UserContext from '../reducers/UserContext';
import NotificationContext from '../reducers/NotificationContext';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import BlogView from './BlogView';

const Blogs = () => {
  const [user] = useContext(UserContext);
  const [, dispatchNotification] = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const result = useQuery('blogs', getBlogs);
  const deleteBlogMutation = useMutation(removeBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });

  const updateBlogMutation = useMutation(updateBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });

  const handleBlogUpdates = async blogObject => {
    updateBlogMutation.mutate(blogObject);
  };

  const handleBlogDeletion = async id => {
    deleteBlogMutation.mutate(id);
  };

  const displayNotification = (message, color) => {
    dispatchNotification({
      type: 'SET_NOTIFICATION',
      payload: {
        message,
        color,
      },
    });
    setTimeout(() => {
      dispatchNotification({
        type: 'REMOVE_NOTIFICATION',
      });
    }, 5000);
  };

  const BlogViewContainer = ({ blogs }) => {
    const id = useParams().id;

    const blog = blogs.find(n => n.id === id);
    console.log(blogs);
    return (
      <BlogView
        key={blog.id}
        blog={blog}
        user={user}
        updateHandler={handleBlogUpdates}
        deleteHandler={handleBlogDeletion}
      />
    );
  };

  const Bloglist = ({ blogs }) => {
    const blogFormRef = useRef();
    const newBlogMutation = useMutation(createBlog, {
      onSuccess: () => {
        queryClient.invalidateQueries('blogs');
      },
    });
    const handleBlogCreation = async blogObject => {
      newBlogMutation.mutate(blogObject);
      displayNotification(
        `An new blog ${blogObject.title} by ${blogObject.author} added `,
        'green',
      );
      blogFormRef.current.toggleVisibility();
    };

    return (
      <div>
        <Togglable buttonLabel={'create blog'} ref={blogFormRef}>
          <BlogForm create={handleBlogCreation} />
        </Togglable>

        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <div
              key={blog.id}
              style={{
                border: 'solid',
                borderWidth: 1,
                padding: 5,
                marginTop: 3,
              }}
            >
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>
          ))}
      </div>
    );
  };
  Bloglist.propTypes = {
    blogs: PropTypes.array.isRequired,
  };
  BlogViewContainer.propTypes = {
    blogs: PropTypes.array.isRequired,
  };

  if (result.isLoading) return <div>still loading</div>;
  const blogs = result.data;

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Bloglist blogs={blogs} />} />
        <Route
          exact
          path="/blogs/:id"
          element={<BlogViewContainer blogs={blogs} />}
        />
      </Routes>
    </div>
  );
};

export default Blogs;
