var roundTo = require('round-to');

var actions = require('./actions');

var initialState = null;

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case actions.START_LINE:
      return {
        p1: action.payload,
        p2: action.payload,
        m: calculateSlope(action.payload, action.payload)
      };
    case actions.DRAG_LINE_START:
      return Object.assign({}, state, {
        p1: action.payload,
        m: calculateSlope(action.payload, state.p2)
      });
    case actions.STOP_LINE:
    case actions.DRAG_LINE_END:
      return Object.assign({}, state, {
        p2: action.payload,
        m: calculateSlope(state.p1, action.payload)
      });
    case actions.SET_LINE:
      return Object.assign({}, action.payload, {
        m: calculateSlope(action.payload.p1, action.payload.p2)
      });
    case actions.CLEAR_LINE:
      return initialState;
    case actions.SET_ANCHOR:
      return Object.assign({}, state, {
        anchor: action.payload
      });
    case actions.MOVE_LINE:
      var delta = [
        action.payload[0] - state.anchor[0],
        action.payload[1] - state.anchor[1]
      ];
      return Object.assign({}, state, {
        p1: addPoint(state.p1, delta),
        p2: addPoint(state.p2, delta),
        anchor: action.payload
      });
    default:
      return state;
  }
}

function calculateSlope(p1, p2) {
  return roundTo(
    (p2[1] - p1[1])/(p2[0] - p1[0]),
    3
  );
}

function addPoint(p1, p2) {
  return [
    p1[0] + p2[0],
    p1[1] + p2[1]
  ];
}