var page = require('page');

var kubusPage = require('./pages/kubus');

require('./app.css');

page('/kubus', kubusPage);
page('/', function() {
  page.redirect('/kubus');
});
page('*', function() {
  document.getElementById('app').innerHTML = '<h1>404 not found</h1>';
});

page.start();