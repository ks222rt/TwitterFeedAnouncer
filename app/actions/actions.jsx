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
    return TwitterApi.fetch_request_token()
      .then((response) => {
        return response.request.response;
      }).catch((error) => {
        throw new Error(error);
      });
  };
};