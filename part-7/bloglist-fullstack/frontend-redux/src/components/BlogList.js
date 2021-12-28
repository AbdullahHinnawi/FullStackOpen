import React, { useEffect } from 'react';

import BlogForm from './BlogForm';
import Notification from './Notification';

import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../reducers/blogReducer';

import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import { setCurrentUser } from '../reducers/userReducer';
import blogService from '../services/blogService';

const BlogList = () => {
  // @ts-ignore
  const blogs = useSelector((state) => state.blog.blogs);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setCurrentUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  return (
    <div style={{ margin: 10 }}>
      {currentUser === null ? (
        <div>
          <h2>Login to the application</h2>
          <Notification />
          <LoginForm />
        </div>
      ) : (
        <>
          <h2>Blogs</h2>
          <div>
            <Notification />
            <BlogForm />
            <br />
            <div id="allBlogsList">
              {blogs
                .sort((a, b) => a.likes - b.likes)
                .reverse()
                .map((blog) => (
                  <div key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                      {blog.title} by {blog.author}{' '}
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogList;
