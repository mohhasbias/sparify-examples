const ADD_LINE = 'ADD_LINE';

function addLine(line) {
  return {
    type: ADD_LINE,
    payload: line
  };
}

function selectLines(rootState) {
  return rootState.lines;
}

module.exports = {
  ADD_LINE: ADD_LINE,
  addLine: addLine,
  selectLines: selectLines
};