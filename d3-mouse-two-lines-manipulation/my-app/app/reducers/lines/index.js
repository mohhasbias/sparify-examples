var uuid = require('uuid/v4');

var actions = require('./actions.js');
var lineActions = require('../line/actions');
var lineReducer = require('../line');

module.exports = function(state = [], action) {
  switch(action.type) {
    case actions.ADD_LINE:
      return [
        ...state,
        Object.assign({}, action.payload, {
          id: uuid()
        })
      ];
    case lineActions.DRAG_LINE_START:
      return state.map(line => {
        if(line.id === action.payload.id) {
          return lineReducer(line, lineActions.dragLineStart(action.payload.position));
        }
        return line;
      });
    case lineActions.DRAG_LINE_END:
      return state.map(line => {
        if(line.id === action.payload.id) {
          return lineReducer(line, lineActions.dragLineEnd(action.payload.position));
        }
        return line;
      });
    default:
      return state;
  }
};