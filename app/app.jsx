// Import external libraries
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

// Import components
import Login from 'Login';
import {TwitterApp} from 'TwitterApp';

// Import and instantiate internal classes
var store = require('configureStore').configure();

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

// Middleware function to verify logged in user
var requireLogin = (nextState, replace, next) => {
  // Change to another login function
  const loggedIn = store.getState();

  if (Object.keys(loggedIn).length < 1) {
    replaceExtender(replace, '/');
  }else if(Object.keys(loggedIn.auth).length === 0) {
    if(loggedIn.auth === true) {
      next();
    }else{
      replaceExtender(replace, '/');
    }
  }else if(loggedIn.auth === false) {
    replaceExtender(replace, '/');
  }

  next();
};

// Middleware function to verify user is already logged in
var redirectIfLoggedIn = (nextState, replace, next) => {
  // Change to another redirect function
  const loggedIn = store.getState();

  if (Object.keys(loggedIn).length > 0 && Object.keys(loggedIn.auth).length !== 0 && loggedIn.auth === true) {
    replaceExtender(replace, '/main');
  }

  next();
};

var replaceExtender = (replace, path) =>{
  replace(path);
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/">
        <Route path="main" component={TwitterApp} onEnter={requireLogin} />
        <IndexRoute component={Login} onEnter={redirectIfLoggedIn} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
