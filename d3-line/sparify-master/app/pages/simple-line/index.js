const diffhtml = require('diffhtml');
const yo = require('yo-yo');
const d3 = require('d3');

module.exports = function() {
  var html = yo`
    <div id="d3-draw-area"></div>
  `;

  diffhtml.innerHTML(document.getElementById('app'), html);

  ///
  var svg = d3.select('#d3-draw-area')
    .append('svg');

  console.log(svg);

  svg.append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 200)
    .attr('y2', 200)
    .style('stroke', 'rgb(255, 0, 0)')
    .style('stroke-width', 2);
};
