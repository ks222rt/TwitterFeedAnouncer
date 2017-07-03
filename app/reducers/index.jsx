import { combineReducers } from 'redux';
// Import reducers and add them to the rootReducer
import authReducer from './component-reducers/auth-reducer.jsx';
import tweetReducer from './component-reducers/tweet-reducer.jsx';

const rootReducer = combineReducers({ 
  auth: authReducer,
  tweets: tweetReducer
});

export default rootReducer;