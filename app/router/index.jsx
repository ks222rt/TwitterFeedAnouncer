import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import * as SessionApi from '../api/SessionApi.js';

// Import components
import Login from 'Login';
import TwitterApp from 'TwitterApp';
import {TwitterLoginValidation} from 'TwitterLoginValidation'

// Middleware function to verify logged in user
var requireLogin = (nextState, replace, next) => {
  SessionApi.is_session_set()
    .then((res) => {
      if(res.loggedIn === false) {
        replace('/');
      }
      next();
    }).catch((err) => {
      console.log(err);
    });
};

// Middleware function to verify if user is already logged in
var redirectIfLoggedIn = (nextState, replace, next) => {
    SessionApi.is_session_set().
      then((res) => {
        if(res.loggedIn === true) {
          replace('/main');
        }
        next();
    }).catch((err) => {
      console.log(err);
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
