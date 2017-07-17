"use strict";

// Store fetched Tweets to the localstorage
export const storeTweets = (Tweets) => {
  var storage = window.localStorage;
  if (storage.length === 0) {
    storage.setItem('Tweets', JSON.stringify(Tweets));
  } else {
    // Will probably change this to another solution later
    var tempTweets = storage.getItem('Tweets');
    var newArr = Tweets.concat(tempTweets);
    storage.setItem('Tweets', JSON.stringify(Tweets)); 
  }

  // This should maybe not be handled here
  handleRateLimitExceed(new Date());
};

// Check if there are Tweets being stored
export const verifyStoredTweets = () => {
  const MAX_AMOUNT_OF_REQUESTS = 15;
  var storage = window.localStorage;
  var time = new Date();
  
  if (storage.length === 0) {
    return false;
  } else {
    if (storage.getItem('Tweets') === null) {
      return false;
    } else if (storage.getItem('RateLimit') === null){
      return false;
    } else {
      var oldTime = JSON.parse(storage.getItem('RateLimit'));
      var timeString = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();

      if (compareTimeDiff(timeString, oldTime.time)) {
        if (oldTime.amountOfRequests < MAX_AMOUNT_OF_REQUESTS) {
          return false;
        }
      } else {
        return false;
      }
    }
  }
  return true;
};

// Fetch stored tweets
export const fetchStoredTweets = () => {
  var storage = window.localStorage;
  return JSON.parse(storage.getItem('Tweets'));
};

// Keeps track of the rate limit in the 15 min interval
export const handleRateLimitExceed = (time) => {
  const MAX_AMOUNT_OF_REQUESTS = 15;
  var storage = window.localStorage;
  var timeString = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();

  if (storage.getItem('RateLimit') === null) {
    var data = {
      time: timeString,
      amountOfRequests: 1
    };
    storage.setItem('RateLimit', JSON.stringify(data));
  } else {
    var oldTime = JSON.parse(storage.getItem('RateLimit'));
    
    if (!compareTimeDiff(timeString, oldTime.time)) {
      oldTime.time = timeString;
      oldTime.amountOfRequests = 1;
    } else {
      if (oldTime.amountOfRequests < 15) {
        oldTime.amountOfRequests += 1;
      }
    }
    storage.setItem('RateLimit', JSON.stringify(oldTime));
  }
};

// Compares the difference between two times and returns the difference
export const compareTimeDiff = (newTime, oldTime) => { 
  const RATE_LIMIT_INTERVAL_IN_SECONDS = 900;

  // Instantiate a date object based on the new time
  var t1 = new Date();
  var parts = newTime.split(":");
  t1.setHours(parts[0],parts[1],parts[2],0);

  // Instantiate a date object based on the old time
  var t2 = new Date();
  parts = oldTime.split(":");
  t2.setHours(parts[0],parts[1],parts[2],0);

  return (parseInt(Math.abs(t1.getTime()-t2.getTime())/1000) < RATE_LIMIT_INTERVAL_IN_SECONDS);
};