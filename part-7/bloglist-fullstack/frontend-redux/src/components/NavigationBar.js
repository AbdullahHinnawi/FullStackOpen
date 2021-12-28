import React, { useEffect } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { logout, setCurrentUser } from '../reducers/userReducer';
import blogService from '../services/blogService';

const NavigationBar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setCurrentUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogout = () => {
    // window.localStorage.clear()
    dispatch(logout());
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">Bloglist App</Navbar.Brand>
        <Nav className="mr-auto" activeKey={window.location.pathname}>
          <Nav.Link href="/">Blogs</Nav.Link>
          <Nav.Link href="/users">Users</Nav.Link>
          {currentUser ? (
            <Nav.Link style={{ color: 'black' }}>
              {currentUser.name} logged in
              <Button
                onClick={handleLogout}
                variant="secondary"
                size="sm"
                style={{ marginLeft: 10 }}
              >
                Logout
              </Button>
            </Nav.Link>
          ) : null}
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
