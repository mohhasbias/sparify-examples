var diffhtml = require('diffhtml');
var yo = require('yo-yo');
var Quill = require('quill');
var he = require('he');

module.exports = function() {
  require('./index.css');

  // render html
  var html = yo`
    <div>
      <div id="toolbar">
        <!-- Add buttons as you would before -->
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>

        <!-- But you can also add your own -->
        <button id="custom-button">${he.decode('&#9742;')}</button>
      </div>
      <div id="editor"></div>
    </div>
  `;

  // pasang ke dom
  diffhtml.innerHTML(document.getElementById('app'), html);

  console.log(Quill);

  var quill = new Quill('#editor', {
    modules: {
      toolbar: true
    },
    theme: 'snow'
  });

  var customButton = document.querySelector('#custom-button');
  customButton.addEventListener('click', function() {
    console.log('Clicked!');
  });
}