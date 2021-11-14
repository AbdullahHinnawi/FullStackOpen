import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log(`exception`, exception);
      setNotificationMessage('Invalid username or password');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    // window.localStorage.clear()
    window.localStorage.removeItem('loggedInUser');
    window.location.reload();
  };

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    try {
      const savedBlog = await blogService.createBlog(newBlog);

      const currentUserJSON = JSON.parse(localStorage.getItem('loggedInUser'));
      const savedBlogWithUserInfo = {
        ...savedBlog,
        user: {
          id: savedBlog.user,
          name: currentUserJSON.name,
          username: currentUserJSON.username,
        },
      };

      setBlogs(blogs.concat(savedBlogWithUserInfo));

      setSuccess(true);
      setNotificationMessage(
        `A new blog ${savedBlog.title} by ${savedBlog.author} added!`
      );

      setTimeout(() => {
        setNotificationMessage(null);
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.log(`error`, error);
      setSuccess(false);
      setNotificationMessage(`Blog title, author or url is missing!`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const updateBlog = async (id, blog) => {
    try {
      await blogService.updateBlog(id, blog);
      setBlogs(
        blogs.map((item) =>
          item.id === id ? { ...item, likes: item.likes + 1 } : item
        )
      );
    } catch (error) {
      console.log(`error`, error);
    }
  };

  const deleteBlog = async (blog) => {
    const deletionConfirmed = window.confirm(
      `Delete blog you are not gonna need it by ${blog.author}?`
    );
    if (deletionConfirmed) {
      try {
        await blogService.deleteBlog(blog.id);
        setBlogs(blogs.filter((item) => item.id !== blog.id));
      } catch (error) {
        console.log('Deletion error: ', error);
      }
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          style={inputStyle}
        />
      </div>
      <div>
        Password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          style={inputStyle}
        />
      </div>
      <button type="submit" id="login-button">
        Log in
      </button>
    </form>
  );

  return (
    <div>
      <h2>Blogs</h2>
      {user === null ? (
        <div>
          <h2>Login to the application</h2>
          <Notification message={notificationMessage} success={success} />
          {loginForm()}
        </div>
      ) : (
        <div>
          <Notification message={notificationMessage} success={success} />
          <div>
            {user.name} logged-in <button onClick={handleLogout}>Logout</button>
          </div>
          <br />
          <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          <br />
          <div id="allBlogsList">
            {blogs
              .sort((a, b) => a.likes - b.likes)
              .reverse()
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  updateBlog={updateBlog}
                  deleteBlog={deleteBlog}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  margin: 3,
};

export default App;
