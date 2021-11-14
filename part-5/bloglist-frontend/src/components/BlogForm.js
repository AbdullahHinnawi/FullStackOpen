import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const addBlog = (event) => {
    event.preventDefault();
    createBlog(newBlog);
    setNewBlog({ title: '', author: '', url: '' });
  };

  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
        <h3>Create new blog</h3>
        <div>
          Title
          <input
            id="title"
            type="text"
            value={newBlog.title || ''}
            name="Title"
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />
        </div>
        <div>
          Author
          <input
            id="author"
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
          />
        </div>
        <div>
          Url
          <input
            id="url"
            type="text"
            value={newBlog.url}
            name="url"
            onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })}
          />
        </div>
        <button type="submit" id="createBtn">
          Create
        </button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
