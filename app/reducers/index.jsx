import { combineReducers } from 'redux';
// Import reducers and add them to the rootReducer
import authReducer from './component-reducers/auth-reducer.jsx';

const rootReducer = combineReducers({ 
  auth: authReducer
});

export default rootReducer;