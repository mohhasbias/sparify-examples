const START_LINE = 'START_LINE';
const DRAG_LINE = 'DRAG_LINE';
const STOP_LINE = 'STOP_LINE';
const CLEAR_LINE = 'CLEAR_LINE';

function startLine(position) {
  return {
    type: START_LINE,
    payload: position
  };
}

function dragLine(position) {
  return {
    type: DRAG_LINE,
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

function selectLine(rootState) {
  return rootState.line;
}

module.exports = {
  START_LINE: START_LINE,
  DRAG_LINE: DRAG_LINE,
  STOP_LINE: STOP_LINE,
  CLEAR_LINE: CLEAR_LINE,
  startLine: startLine,
  dragLine: dragLine,
  stopLine: stopLine,
  clearLine: clearLine,
  selectLine: selectLine
};