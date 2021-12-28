import React from 'react';

import { useLocation } from 'react-router-dom';

const User = () => {
  const location = useLocation();

  const user = location.state.user;

  return (
    <div style={{ margin: 10 }}>
      {user ? (
        <div>
          <h2>{user.name}</h2>
          <div>
            <h3>Added blogs</h3>
            <div>
              {user.blogs.length ? (
                <ul>
                  {user.blogs.map((blog) => (
                    <li>
                      {blog.title} by {blog.author}
                    </li>
                  ))}
                </ul>
              ) : (
                'Not found'
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default User;
