import React, { useState } from 'react';
import Button from '../components/Button';

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleClick = () => {
    setVisible(!visible);
  };

  const handleLikeClick = () => {
    const updatedBlogObject = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    updateBlog(updatedBlogObject.id, updatedBlogObject);
  };

  const handleDelete = () => {
    deleteBlog(blog);
  };

  return (
    <div style={blogStyle} className="blog">
      {blog.title} by {blog.author}{' '}
      <Button
        onClick={handleClick}
        children={visible ? 'Hide' : 'View'}
        style={buttonStyle}
        className="DetailsBtn"
      />
      {visible ? (
        <div className="blogDetails">
          <div>
            {blog.url}
            <br />
            likes {blog.likes}{' '}
            <Button
              onClick={handleLikeClick}
              children={'Like'}
              style={buttonStyle}
              className="likeBtn"
            />
          </div>
          <div>
            {blog.user.name}
            <br />
            {loggedInUser.username === blog.user.username ? (
              <Button
                className="deleteBtn"
                onClick={handleDelete}
                children={'Delete'}
                style={{ marginTop: 5 }}
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const blogStyle = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

const buttonStyle = {
  marginLeft: 5,
};

export default Blog;
