import * as TwitterApi from '../api/TwitterApi.js';

// Create and export actions

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
    const test = getState();
    console.log(TwitterApi);
    TwitterApi.fetch_request_token('http://twitter-feed-anouncer.herokuapp.com/#/twitter/authentication/callback')
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
  }
}