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
  });

  addAndDrawRandomLine();
  addAndDrawRandomLine();

  // featureDrawLine(d3DrawArea, store);

  /////////////////////////
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
      .style('stroke-width', 3)
      .merge(update.select('line.line'))
      .attr('x1', d => d.p1[0])
      .attr('y1', d => d.p1[1])
      .attr('x2', d => d.p2[0])
      .attr('y2', d => d.p2[1]);

    group
      .append('line')
      .attr('class', 'hit-area')
      .style('stroke', 'rgba(255, 0, 0, 0.5)')
      .style('opacity', 0)
      .style('stroke-width', 10)
      .style('cursor', 'move')
      .merge(update.select('line.hit-area'))
      .attr('x1', d => d.p1[0])
      .attr('y1', d => d.p1[1])
      .attr('x2', d => d.p2[0])
      .attr('y2', d => d.p2[1])
      .call(d3.drag()
        .on('start', setAnchor)
        .on('drag', moveLine));

    group
      .append('circle')
      .attr('class', 'hit-area line-start')
      .style('fill', 'rgba(0, 255, 0, 0.5)')
      .style('opacity', 0)
      .style('cursor', 'pointer')
      .merge(update.select('circle.hit-area.line-start'))
      .attr('cx', d => d.p1[0])
      .attr('cy', d => d.p1[1])
      .attr('r', 10)
      .call(d3.drag()
        .on('drag', dragLineStart));

    group
      .append('circle')
      .attr('class', 'hit-area line-end')
      .style('fill', 'rgba(0, 0, 255, 0.5)')
      .style('opacity', 0)
      .style('cursor', 'pointer')
      .merge(update.select('circle.hit-area.line-end'))
      .attr('cx', d => d.p2[0])
      .attr('cy', d => d.p2[1])
      .attr('r', 10)
      .call(d3.drag()
        .on('drag', dragLineEnd));

    ////////////////////////////////
    function dragLineStart(d) {
      // store.dispatch(lineActions.dragLineStart(d3.mouse(this)));
      store.dispatch(linesActions.dragLineStart(d.id, d3.mouse(this)));
    }

    function dragLineEnd(d) {
      // store.dispatch(lineActions.dragLineEnd(d3.mouse(this)));
      store.dispatch(linesActions.dragLineEnd(d.id, d3.mouse(this)));
    }

    function setAnchor(d) {
      store.dispatch(linesActions.setAnchor(d.id, d3.mouse(this)));
    }

    function moveLine(d) {
      store.dispatch(linesActions.moveLine(d.id, d3.mouse(this)));
    }
  }

  function featureDrawLine(drawArea, store) {
    // do some updates on store changes
    store.subscribe(function() {
      drawLine(lineActions.selectLine(store.getState()));
    });

    drawArea
      .call(d3.drag()
        .on('start', startLine)
        .on('drag', dragLine)
        .on('end', stopLine)
      );

    //////////////////
    function startLine() {
      store.dispatch(lineActions.startLine(d3.mouse(this)));
    }

    function dragLine() {
      store.dispatch(lineActions.dragLineEnd(d3.mouse(this)));
    }

    function stopLine() {
      store.dispatch(lineActions.stopLine(d3.mouse(this)));
    }

    function drawLine(data) {
      data = data? [data] : [];

      var update = drawArea.selectAll('g.line-preview')
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

      group
        .append('line')
        .attr('class', 'hit-area')
        .style('stroke', 'rgba(255, 0, 0, 0.5)')
        .style('opacity', 0)
        .style('stroke-width', 10)
        .merge(update.select('line.hit-area'))
        .attr('x1', d => d.p1[0])
        .attr('y1', d => d.p1[1])
        .attr('x2', d => d.p2[0])
        .attr('y2', d => d.p2[1]);

      group
        .append('circle')
        .attr('class', 'hit-area line-start')
        .style('fill', 'rgba(0, 255, 0, 0.5)')
        .style('cursor', 'pointer')
        .merge(update.select('circle.hit-area.line-start'))
        .attr('cx', d => d.p1[0])
        .attr('cy', d => d.p1[1])
        .attr('r', 10)
        .call(d3.drag()
          .on('drag', dragLineStart));

      group
        .append('circle')
        .attr('class', 'hit-area line-end')
        .style('fill', 'rgba(0, 0, 255, 0.5)')
        .style('cursor', 'pointer')
        .merge(update.select('circle.hit-area.line-end'))
        .attr('cx', d => d.p2[0])
        .attr('cy', d => d.p2[1])
        .attr('r', 10)
        .call(d3.drag()
          .on('drag', dragLineEnd));

      /////////////////////
      function dragLineStart() {
        store.dispatch(lineActions.dragLineStart(d3.mouse(this)));
      }

      function dragLineEnd() {
        store.dispatch(lineActions.dragLineEnd(d3.mouse(this)));
      }
    }
  }
};