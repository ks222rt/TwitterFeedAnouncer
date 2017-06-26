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
    TwitterApi.test(test)
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
  }
}