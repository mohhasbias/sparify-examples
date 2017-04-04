var actions = require('./actions.js');

module.exports = function(state = [], action) {
  switch(action.type) {
    case actions.ADD_LINE:
      return [
        ...state,
        action.payload
      ]
    default:
      return state;
  }
};