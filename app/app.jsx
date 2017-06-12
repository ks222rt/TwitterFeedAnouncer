
// change to import
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
//var store = require('configureStore').configure();
import router from 'app/router/';

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

/*ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);*/

// Uncomment render function above to use provider store
ReactDOM.render(
  router,
  document.getElementById('app')
);
