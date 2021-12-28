import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers, setCurrentUser } from '../reducers/userReducer';
import blogService from '../services/blogService';
import LoginForm from './LoginForm';
import Notification from './Notification';

const UserList = () => {
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    dispatch(fetchUsers());
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
          <h2>Users</h2>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th style={{ paddingLeft: 36 }}>Blogs created</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <Link
                        to={{
                          pathname: `/users/${user.id}`,
                          state: { user },
                        }}
                      >
                        {user.name}
                      </Link>
                    </td>
                    <td style={{ paddingLeft: 36 }}> {user.blogs.length}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default UserList;
