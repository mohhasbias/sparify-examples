const CALCULATE_PERPENDICULAR = 'CALCULATE_PERPENDICULAR';

function calculatePerpendicular(line1, line2) {
  return {
    type: CALCULATE_PERPENDICULAR,
    payload: {
      line1: line1,
      line2: line2
    }
  };
}

function selectIsPerpendicular(rootState) {
  return rootState.isPerpendicular;
}

module.exports = {
  CALCULATE_PERPENDICULAR: CALCULATE_PERPENDICULAR,
  calculatePerpendicular: calculatePerpendicular,
  selectIsPerpendicular: selectIsPerpendicular
};