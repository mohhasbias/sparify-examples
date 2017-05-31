var yo = require('yo-yo');
var diffhtml = require('diffhtml');
var $ = require('jquery');

module.exports = function() {
  require('bootstrap');
  require('./index.css');

  // render template
  var html = yo`
    <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
      <!-- Indicators -->
      <ol class="carousel-indicators">
        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
      </ol>

      <!-- Wrapper for slides -->
      <div class="carousel-inner" role="listbox">
        <div class="item active">
          <img src="http://unsplash.it/300/200?image=1084" alt="walrus">
          <div class="carousel-caption">
            This is a walrus
          </div>
        </div>
        <div class="item">
          <img src="http://unsplash.it/300/200?image=1080" alt="strawberry">
          <div class="carousel-caption">
            These are strawberries
          </div>
        </div>
        <div class="item">
          <img src="http://unsplash.it/300/200?image=1074" alt="lion">
          <div class="carousel-caption">
            This is a lion
          </div>
        </div>
      </div>

      <!-- Controls -->
      <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  `;

  // render to DOM
  diffhtml.innerHTML(
    document.getElementById('app'),
    html
  );

  $('.carousel').carousel();
}