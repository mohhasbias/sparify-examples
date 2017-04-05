var redux = require('redux');

var reducers = redux.combineReducers({
  lines: require('../reducers/lines'),
  // line: require('../reducers/line')
});

var store = redux.createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

module.exports = store;