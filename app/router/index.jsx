import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import TestApp from 'test';

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
      <IndexRoute component={TestApp} />
    </Route>
  </Router>
);
