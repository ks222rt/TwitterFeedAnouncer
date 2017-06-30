import * as TwitterApi from '../api/TwitterApi.js';

// Create and export actions

// Login reducers
export const login = (loggedIn) => {
  return {
    type: 'LOGIN',
    loggedIn
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export const startLogin = () => {
  return (dispatch, getState) => {
    return TwitterApi.fetch_request_token()
        .then((response) => {
          console.log('Actions.jsx');
          console.log(response);
        }).catch((error) => {
          console.log(error);
        });
  };
};

// Fetch and add Tweet reducers
export const startAddTweets = () => {
  return (dispatch, getState) => {
    var tweetsRef = TwitterApi.fetch_home_timeline();
  };
};