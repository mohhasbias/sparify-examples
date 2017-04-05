const START_LINE = 'START_LINE';
const DRAG_LINE_START = 'DRAG_LINE_START';
const DRAG_LINE_END = 'DRAG_LINE_END';
const STOP_LINE = 'STOP_LINE';
const CLEAR_LINE = 'CLEAR_LINE';
const SET_LINE = 'SET_LINE';
const MOVE_LINE = 'MOVE_LINE';
const SET_ANCHOR = 'SET_ANCHOR';

function startLine(position) {
  return {
    type: START_LINE,
    payload: position
  };
}

function dragLineStart(position) {
  return {
    type: DRAG_LINE_START,
    payload: position
  };
}

function dragLineEnd(position) {
  return {
    type: DRAG_LINE_END,
    payload: position
  };
}

function stopLine(position) {
  return {
    type: STOP_LINE,
    payload: position
  };
}

function clearLine() {
  return {
    type: CLEAR_LINE
  };
}

function setLine(line) {
  return {
    type: SET_LINE,
    payload: line
  };
}

function setAnchor(position) {
  return {
    type: SET_ANCHOR,
    payload: position
  };
}

function moveLine(position) {
  return {
    type: MOVE_LINE,
    payload: position
  }
}

function selectLine(rootState) {
  return rootState.line;
}

module.exports = {
  START_LINE: START_LINE,
  DRAG_LINE_START: DRAG_LINE_START,
  DRAG_LINE_END: DRAG_LINE_END,
  STOP_LINE: STOP_LINE,
  SET_LINE: SET_LINE,
  SET_ANCHOR: SET_ANCHOR,
  MOVE_LINE: MOVE_LINE,
  CLEAR_LINE: CLEAR_LINE,
  startLine: startLine,
  dragLineStart: dragLineStart,
  dragLineEnd: dragLineEnd,
  stopLine: stopLine,
  clearLine: clearLine,
  setLine: setLine,
  setAnchor: setAnchor,
  moveLine: moveLine,
  selectLine: selectLine
};