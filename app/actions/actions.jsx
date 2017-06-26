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
    TwitterApi.fetch_request_token('%20http%3A%2F%2Ftwitter-feed-anouncer.herokuapp.com%2F%23%2Ftwitter%2Fauthentication%2Fcallback')
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
  }
}