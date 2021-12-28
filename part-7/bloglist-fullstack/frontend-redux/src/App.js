import React from 'react';
import Blog from './components/Blog';
import { Switch, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import UserList from './components/UserList';
import User from './components/User';
import BlogList from './components/BlogList';

const App = () => {
  return (
    <div>
      <NavigationBar />
      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/">
          <BlogList />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
