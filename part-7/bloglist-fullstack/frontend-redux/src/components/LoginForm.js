import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/userReducer';
import blogService from '../services/blogService';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const currentUser = useSelector((state) => state.user.currentUser);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login({ username, password }));
    if (currentUser) {
      blogService.setToken(currentUser.token);
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div>
      <Form onSubmit={handleLogin} style={{ width: 400 }}>
        <Form.Group className="mb-1" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            size="sm"
          />
        </Form.Group>
        <Form.Group className="mb-1" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            size="sm"
          />
        </Form.Group>

        <Button
          type="submit"
          id="login-button"
          variant="primary"
          size="sm"
          className="mt-1"
        >
          Log in
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
