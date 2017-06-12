import * as redux from 'redux';
import thunk from 'redux-thunk';

// Import combined reducers from reducer map
import reducer from 'reducers';

export var configure = (initialState = {}) => {
  
  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
