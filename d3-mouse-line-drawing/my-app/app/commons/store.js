var redux = require('redux');

var reducers = redux.combineReducers({
  lines: require('../reducers/lines')
});

var store = redux.createStore(reducers);

module.exports = store;