const ADD_LINE = 'ADD_LINE';

var lineActions = require('../line/actions');

function addLine(line) {
  return {
    type: ADD_LINE,
    payload: line
  };
}

function dragLineStart(id, position) {
  return {
    type: lineActions.DRAG_LINE_START,
    payload: {
      id: id,
      position: position
    }
  };
}

function dragLineEnd(id, position) {
  return {
    type: lineActions.DRAG_LINE_END,
    payload: {
      id: id,
      position: position
    }
  };
}

function setAnchor(id, position) {
  return {
    type: lineActions.SET_ANCHOR,
    payload: {
      id: id,
      position: position
    }
  }
}

function moveLine(id, position) {
  return {
    type: lineActions.MOVE_LINE,
    payload: {
      id: id,
      position: position
    }
  };
}

function selectLines(rootState) {
  return rootState.lines;
}

module.exports = {
  ADD_LINE: ADD_LINE,
  addLine: addLine,
  dragLineStart: dragLineStart,
  dragLineEnd: dragLineEnd,
  setAnchor: setAnchor,
  moveLine: moveLine,
  selectLines: selectLines
};