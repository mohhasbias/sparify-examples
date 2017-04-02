var yo = require('yo-yo');
var diffhtml = require('diffhtml');
var d3 = require('d3');

var store = require('../../commons/store');
var lineActions = require('../../reducers/lines/actions');

module.exports = function() {
  require('./index.css');

  // render template
  var html = yo`
    <div id="d3-draw-area"></div>
  `;

  // render to DOM
  diffhtml.innerHTML(
    document.getElementById('app'),
    html
  );

  // d3 app
  var d3DrawArea = d3.select('#d3-draw-area')
    .append('svg')
    .attr('width', window.innerWidth)
    .attr('height', window.innerHeight);

  store.subscribe(function() {
    console.log(store.getState());
    drawLines(lineActions.selectLines(store.getState()));
  });

  addAndDrawRandomLine();

  setTimeout(function() {
    addAndDrawRandomLine();
  }, 1000);

  setTimeout(function() {
    addAndDrawRandomLine();
  }, 2000);

  setTimeout(function() {
    addAndDrawRandomLine();
  }, 3000);

  ///////////////////////////////////////////////////////////
  function addAndDrawRandomLine(linesData) {
    var randomLine = {
      p1: [Math.random()*400+200, Math.random()*400+200],
      p2: [Math.random()*400+200, Math.random()*400+200]
    };
    store.dispatch(lineActions.addLine(randomLine));
  }

  function drawLines(data) {
    var update = d3DrawArea.selectAll('g.lines')
      .data(data)
      .attr('class', 'lines');

    update.exit().remove();

    var group = update.enter()
      .append('g')
      .attr('class', 'lines');

    group
      .append('line')
      .attr('class', 'line')
      .style('stroke', `rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, 0.5)`)
      .merge(update.select('line.line'))
      .attr('x1', d => d.p1[0])
      .attr('y1', d => d.p1[1])
      .attr('x2', d => d.p2[0])
      .attr('y2', d => d.p2[1]);
  }
}