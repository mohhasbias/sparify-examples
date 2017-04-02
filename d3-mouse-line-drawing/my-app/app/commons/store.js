var redux = require('redux');

var reducers = require('../reducers/lines');

var store = redux.createStore(reducers);

module.exports = store;