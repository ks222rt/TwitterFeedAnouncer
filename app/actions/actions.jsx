"use strict";
import * as TwitterApi from '../api/TwitterApi.js';
import * as SessionApi from '../api/SessionApi.js';
import * as LocalStorageApi from '../api/LocalStorageApi.js';

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
          console.log('Succesfully logged in!', response);
        }).catch((error) => {
          console.log('Unable to login', error);
        });
  };
};

export const startLogout = () => {
  return (dispatch, getState) => {
    return SessionApi.logout_and_unset_session()
      .then((response) => {
        console.log('Logout succesfully');
        return response.data;
      }).catch((error) => {
        console.log('Unable to logout');
        return error.data;
      });
  }
};

// Fetch and add Tweet reducers
export const startAddTweets = () => {
  return (dispatch, getState) => {
    TwitterApi.fetch_home_timeline()
      .then((response) => {
        var tweets = response.data.tweetArray;
        var parsedTweets = [];

        Object.keys(tweets).forEach((tweetID) => {
          parsedTweets.push({
            id: tweetID,
            ...tweets[tweetID]
          });
        });
        dispatch(addTweets(parsedTweets));
        LocalStorageApi.storeTweets(parsedTweets);
      }).catch((error) => {
        console.log(error);
      });
  
  };
};

// Adds tweets from localstorage to redux state
export const addStoredTweets = (Tweets) => {
  return (dispatch, getState) => {
    var parsedTweets = [];

    Object.keys(Tweets).forEach((tweetID) => {
      parsedTweets.push({
        id: tweetID,
        ...Tweets[tweetID]
      });
    });
    dispatch(addTweets(parsedTweets));
  };
};

export const addTweets = (tweets) => {
  return {
    type: 'ADD_TWEETS',
    tweets
  };
};  