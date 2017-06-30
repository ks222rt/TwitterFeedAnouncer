// Import external libraries
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {hashHistory} from 'react-router';

//import * as TwitterApi from './api/TwitterApi.js';
import router from 'app/router/';
import * as SessionApi from './api/SessionApi.js';
import * as actions from 'actions';

// Import and instantiate internal classes
var store = require('configureStore').configure();

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

SessionApi.is_session_set()
  .then((response) => {
    if(response.loggedIn === true) {
      console.log(response);
      console.log('appen start');
      store.dispatch(actions.login(response.user.id));
      store.dispatch(actions.startAddTweets());
      hashHistory.push('/main');
    }else{
      store.dispatch(actions.logout());
      hashHistory.push('/');
    }
  }).catch((error) => {

  });

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
