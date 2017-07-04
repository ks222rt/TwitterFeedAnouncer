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
        
      }).catch((error) => {
        console.log(error);
      });
  
  };
};

export const addTweets = (tweets) => {
  return {
    type: 'ADD_TWEETS',
    tweets
  };
};  