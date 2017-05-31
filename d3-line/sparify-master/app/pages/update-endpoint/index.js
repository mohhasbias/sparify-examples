const diffhtml = require('diffhtml');
const yo = require('yo-yo');
const d3 = require('d3');

module.exports = function() {
  const d3id = 'd3-draw-area';
  const d3idSelector = `#${d3id}`;

  var html = yo`
    <div id="${d3id}"></div>
  `;

  diffhtml.innerHTML(document.getElementById('app'), html);

  ///
  var svg = d3.select(d3idSelector).append('svg')
    .attr('width', 300)
    .attr('height', 300)
    .style('background', 'lightblue');

  var line = svg.append('line')
    .attr('x1', 100)
    .attr('y1', 100)
    .attr('x2', 200)
    .attr('y2', 200)
    .style('stroke', 'blue')
    .style('stroke-width', 2);

  var drag = false;
  svg.on('mousedown', function() {
    drag = true;
  });

  // update endpoint on mousemove over svg
  svg.on('mousemove', function() {
    if(!drag) {
      return;
    }
    // get mouse position relative to "this" svg
    var mousePosition = d3.mouse(this);
    // use it to update endpoint (x2, y2)
    line
      .attr('x2', mousePosition[0])
      .attr('y2', mousePosition[1]);
  });

  svg.on('mouseup', function() {
    drag = false;
  });
};
