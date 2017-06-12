import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import Login from 'Login';
import {TwitterApp} from 'TwitterApp';

var requireLogin = (nextState, replace, next) => {
  // Change to another login function
  const userLoggedIn = false;
  if (userLoggedIn) {
    replace('/');
  }
  next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
  // Change to another redirect function
  const userLoggedIn = false;
  if (userLoggedIn) {
    replace('/');
  }

  next();
};

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="main" component={TwitterApp} onEnter={requireLogin} />
      <IndexRoute component={Login} onEnter={redirectIfLoggedIn} />
    </Route>
  </Router>
);
