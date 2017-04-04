var yo = require('yo-yo');
var diffhtml = require('diffhtml');
var d3 = require('d3');

var store = require('../../commons/store');
var linesActions = require('../../reducers/lines/actions');
var lineActions = require('../../reducers/line/actions');

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

  // create d3 draw area
  var d3DrawArea = d3.select('#d3-draw-area')
    .append('svg')
    .attr('width', window.innerWidth)
    .attr('height', window.innerHeight);

  // do some updates on store changes
  store.subscribe(function() {
    drawLines(linesActions.selectLines(store.getState()));
    drawLine(lineActions.selectLine(store.getState()));
  });

  // addAndDrawRandomLine();

  // line drawing for preview
  // store.dispatch(lineActions.startLine([100, 100]));
  // store.dispatch(lineActions.stopLine([250, 300]));

  d3DrawArea
    .call(d3.drag()
      .on("start", dragStart)
      .on("drag", dragging)
      .on("end", dragStop)
    );

  ///////////////////////////////////////////////////////////
  function dragStart() {
    store.dispatch(lineActions.startLine(d3.mouse(this)));
  }

  function dragging() {
    store.dispatch(lineActions.dragLine(d3.mouse(this)));
  }

  function dragStop() {
    store.dispatch(lineActions.stopLine(d3.mouse(this)));
    var newLine = lineActions.selectLine(store.getState());
    store.dispatch(linesActions.addLine(newLine));
    store.dispatch(lineActions.clearLine());
  }

  function addAndDrawRandomLine(linesData) {
    var randomLine = {
      p1: [Math.random()*400+200, Math.random()*400+200],
      p2: [Math.random()*400+200, Math.random()*400+200]
    };
    store.dispatch(linesActions.addLine(randomLine));
  }

  function drawLines(data) {
    var update = d3DrawArea.selectAll('g.lines')
      .data(data);

    update.exit().remove();

    var group = update.enter()
      .append('g')
      .attr('class', 'lines');

    group
      .append('line')
      .attr('class', 'line')
      .style('stroke', `rgba(${Math.floor(Math.random()*128)}, ${Math.floor(Math.random()*128)}, ${Math.floor(Math.random()*128)}, 0.75)`)
      .merge(update.select('line.line'))
      .attr('x1', d => d.p1[0])
      .attr('y1', d => d.p1[1])
      .attr('x2', d => d.p2[0])
      .attr('y2', d => d.p2[1]);
  }

  function drawLine(data) {
    data = data? [data] : [];

    var update = d3DrawArea.selectAll('g.line-preview')
      .data(data);

    update.exit().remove();

    var group = update.enter()
      .append('g')
      .attr('class', 'line-preview');

    group
      .append('line')
      .attr('class', 'line')
      .style('stroke', 'black')
      .merge(update.select('line.line'))
      .attr('x1', d => d.p1[0])
      .attr('y1', d => d.p1[1])
      .attr('x2', d => d.p2[0])
      .attr('y2', d => d.p2[1]);
  }
};