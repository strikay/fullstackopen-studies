// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@mui/material';

const BlogForm = ({ create }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleBlogCreation = event => {
    event.preventDefault();

    const blogObject = { author, title, url };
    create(blogObject);

    setAuthor('');
    setTitle('');
    setUrl('');
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
          title:
          <TextField
            variant="standard"
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="input title"
          />
        </div>
        <div>
          author:
          <TextField
            variant="standard"
            id="author"
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            placeholder="input author"
          />
        </div>
        <div>
          url:
          <TextField
            variant="standard"
            id="url"
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="input url"
          />
        </div>
        <Button
          id="create-blog"
          variant="contained"
          color="primary"
          type="submit"
        >
          create
        </Button>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  create: PropTypes.func.isRequired,
};

export default BlogForm;
