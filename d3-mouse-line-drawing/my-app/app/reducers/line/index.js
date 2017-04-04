var actions = require('./actions');

var initialState = null;

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case actions.START_LINE:
      return {
        p1: action.payload,
        p2: action.payload
      };
    case actions.STOP_LINE:
    case actions.DRAG_LINE:
      return Object.assign({}, state, {
        p2: action.payload
      });
    case actions.CLEAR_LINE:
      return initialState;
    default:
      return state;
  }
}