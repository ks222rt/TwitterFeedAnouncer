import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

var requireLogin = (nextState, replace, next) => {
  // Change to another login function
  const userLoggedIn = false;
  console.log(userLoggedIn);
  if (userLoggedIn) {
    replace('/');
  }
  next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
  // Change to another redirect function
  const userLoggedIn = false;
  if (userLoggedIn) {
    replace('/main');
  }
  next();
};

export default (
  <Router history={hashHistory}>
    <Route path="/">
    </Route>
  </Router>
);
