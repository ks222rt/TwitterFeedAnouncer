import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import * as SessionApi from '../api/SessionApi.js';

// Import components
import Login from 'Login';
import {TwitterApp} from 'TwitterApp';
import {TwitterLoginValidation} from 'TwitterLoginValidation'

// Middleware function to verify logged in user
var requireLogin = (nextState, replace, next) => {
  SessionApi.is_session_set().then((res) => {
    if(res === false) {
      replace('/');
    }
    next();
  });
};

// Middleware function to verify if user is already logged in
var redirectIfLoggedIn = (nextState, replace, next) => {
    SessionApi.is_session_set().then((res) => {
      if(res === true) {
        replace('/main');
      }

      next();
    });

};

export default (
  <Router history={hashHistory}>
      <Route path="/">
        <Route path="main" component={TwitterApp} onEnter={requireLogin} />
        <Route path="check/twitter/authentication" component={TwitterLoginValidation} />
        <IndexRoute component={Login} onEnter={redirectIfLoggedIn} />
      </Route>
    </Router>
);
