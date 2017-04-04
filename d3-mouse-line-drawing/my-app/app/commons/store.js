var redux = require('redux');

var reducers = redux.combineReducers({
  lines: require('../reducers/lines'),
  line: require('../reducers/line')
});

var store = redux.createStore(reducers);

module.exports = store;