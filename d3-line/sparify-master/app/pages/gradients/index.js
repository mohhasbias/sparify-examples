const diffhtml = require('diffhtml');
const yo = require('yo-yo');
const d3 = require('d3');
const $ = require('jquery');

module.exports = function() {
  const d3id = 'd3-draw-area';
  const d3idSelector = `#${d3id}`;

  var html = yo`
    <div>
      <div id="${d3id}" style="padding: 100px;"></div>
      <div id="status-garis"></div>
    </div>
  `;

  diffhtml.innerHTML(document.getElementById('app'), html);

  ///
  var svg = d3.select(d3idSelector).append('svg')
    .attr('width', 300)
    .attr('height', 300)
    .style('background', 'lightblue');

  var line = svg.append('line')
    .attr('x1', 50)
    .attr('y1', 250)
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

    var x1 = line.attr('x1');
    var y1 = line.attr('y1');
    var x2 = line.attr('x2');
    var y2 = line.attr('y2');

    var dy = Math.abs(y2-y1);
    var dx = Math.abs(x2-x1);
    var m = dy/dx;

    var thresholdM = 0.03; // 0...1
    var thresholdDx = 3; // 0, 1, 2, ... width
    if(m >= 0 && m <= thresholdM) {
      $('#status-garis').text('horizontal');
    } else if(m+thresholdM >= 1 && m-thresholdM <= 1) {
      $('#status-garis').text('diagonal');
    } else if(dx+thresholdDx >= 0 && dx-thresholdDx <= 0) {
      $('#status-garis').text('vertikal');
    } else {
      $('#status-garis').text('');
    }
  });

  svg.on('mouseup', function() {
    drag = false;
  });
};
