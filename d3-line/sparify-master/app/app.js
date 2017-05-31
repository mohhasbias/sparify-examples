const page = require('page');

const simpleLinePage = require('./pages/simple-line')
const updateEndpointPage = require('./pages/update-endpoint');
const gradientsPage = require('./pages/gradients');

// inject stylesheet
require('./app.css');

page('/simple-line', simpleLinePage);
page('/update-endpoint', updateEndpointPage);
page('/gradients', gradientsPage);

page('/', () => {
  page.redirect('/simple-line');
});

page('*', () => {
  document.getElementById('app').innerHTML = '<h1>404 Not Found</h1>';
});

page.start();
