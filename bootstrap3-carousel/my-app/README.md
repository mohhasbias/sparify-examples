# Features
## client side routing
client side routing is provided by [page.js](https://visionmedia.github.io/page.js/)
. It allows declaring a path using express style. for example
```javascript
page('/home', showHomePage);
page('/about', showAboutPage);
page('/contact', showContactPage);
```

## html templating
html templating is provided by [yo-yo](https://github.com/maxogden/yo-yo).
yo-yo provide html templating with interpolation support and nesting. It also support event handler. yo-yo always sanitize html, so it might pose a problem when using html entities. To use html entities, it needs to be converted to unicode first. The conversion could be done using util such as [he](https://github.com/mathiasbynens/he).  

example 1. Interpolation
```javascript
var name = 'World';
var html = yo`
  <h1>Hello, ${name}</h1>
`;
```

example 2. Nesting
```javascript
var items = ['banana', 'apple', 'strawberry'];
var html = yo`
  <ul>
    ${items.map(item => yo`
      <li>${item}</li>
    `)}
  </ul>
`;
```

example 3. Event handler
```javascript
var html = yo`
  <button onclick=${clickMe}></button>
`;

function clickMe() {
  alert('ouch');
}
```

## Patch based DOM rendering
DOM rendering is provided by [diffhtml](https://diffhtml.org/). It renders only the different between current DOM and updated DOM. Similar to the way React works.

```javascript
diffhtml.innerHTML(document.body, '<h1>Hello</h1>'); // it will append h1 only if it is not exists
```

## Styling
Styling support is provided by [scssify](https://github.com/cody-greene/scssify). It support css and sass. It automatically inject style when ```require``` a css/scss file.

example
```javascript
require('my-style.scss'); // it will inject the content to style tag on head element
```

## Global State Manager
state management is provided by [redux](http://redux.js.org/). Originally designed for React, but could be used in any kind of javascript app.

## Modular Javascript
Javascript modularity is provided by [browserify](http://browserify.org/). Which allow the use of ```require()```. It works by compiling a javascript entry file into a javascript bundle file.

# Usage

## Folder Structure
This boilerplate works based on this directory structure
```
.
├── app
|   ├── components
|   ├── pages
|   ├── app.js
|   └── app.scss
├── assets
|   └── i
├── data
├── dist
├── .gitignore
├── index.html
├── package.json
└── README.md
```

## Requirements
before using this boilerplate, install all dependencies using npm.
```bash
npm install
```

## Development
run dev script to start development
```bash
npm run dev
```
it will start local http server then open a browser. It will also watch for file changes and then reload the browser accordingly.

## Deployment
run build script to save ```bundle.js``` to ```dist``` directory.

```bash
npm run build
```

then deploy using your favourite tool or try [dploy](http://lucasmotta.github.io/dploy/).

# Advanced Usage

## Web Font
use [fontfaceobserver](https://fontfaceobserver.com/) for loading fonts from [Google Fonts](http://www.google.com/fonts), [Typekit](http://typekit.com/), [Fonts.com](https://fonts.com/), and [Webtype](http://webtype.com/)