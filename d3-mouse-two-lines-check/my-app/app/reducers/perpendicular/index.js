var actions = require('./actions');

var initialState = {
  isPerpendicular: false,
  slopeMultiplication: 0
};

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case actions.CALCULATE_PERPENDICULAR:
      var slopeMultiplication = action.payload.line1.m * action.payload.line2.m;
      var isPerpendicular = slopeMultiplication === -1;
      return {
        isPerpendicular: isPerpendicular,
        slopeMultiplication: slopeMultiplication
      };
    default:
      return state;
  }
}