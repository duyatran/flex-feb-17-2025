### M04W08 - Client-side JavaScript

### To Do
- [ ] JavaScript in the browser
- [ ] The Document Object Model (DOM)
- [ ] Browser objects: `window`, `navigator`, `document`
- [ ] DOM manipulation
- [ ] Intro to jQuery

## The browser
 - The browser has a JavaScript Runtime Environment
 - The browser has an HTML rendering and interaction engine
 - The browser can style rendered pages based on CSS styles
 - The browser can make HTTP requests

### The **D**ocument **O**bject **M**odel
- Our HTML is turned into a data structure that we call the **D**ocument **O**bject **M**odel or the **DOM**
- The DOM is conceptually a [`tree`](https://en.wikipedia.org/wiki/Tree_(data_structure)) data structure with hierarchical parent/child/sibling relationships between various parts of the page
- The DOM provides a JavaScript interface for us to interact with the web page:
  - Retrieve the contents of any tag
  - Change the contents of any tag
  - Change the style of any element
  - Add or remove elements to/from the page
  - Handle user interaction events

- eg. The browser turns your HTML into the DOM

```html
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Welcome to my page!</h1>
    <div class="content">
      <p>My Favourite Numbers</p>
      <ul id="main-list">
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </ul>
    </div>
  </body>
</html>
```

![DOM example](https://raw.githubusercontent.com/andydlindsay/lectures/master/w04d02/dom-example.png)
*Green outline === HTML element; Pink outline === text node*

### Useful browser Objects
- **`document` object**
  - Represents the DOM
  - Can be seen in the browser console by running `console.dir(document)`
- **`window` object**
  - Represents the window that holds the DOM object
  - Each tab in a browser is a _window_ with its own `window` object
  - Contains (among other things) information about the size of the window and screen
- **`navigator` object**
  - Contains information about the browser such as browser version, browser name, and geographic location

```js
// you can also access navigator and document as props on the window object
window.navigator === navigator; // true
window.document === document; // true
```

### DOM Events
- An event is a notification that some action has occurred (eg. a button is clicked, the mouse pointer is moved, a key is pressed)
- We can attach code (usually in the form of a `callback` function) to run when a specific event occurs... we call this "_attaching an event listener_"

```js
// we can use anonymous functions...
document
  .querySelector('button')
  .addEventListener('click', (event) => {
  // do something
  });

// or named functions
const eventHandler = function (event) {
  // do something
};
document
  .querySelector('button')
  .addEventListener('click', eventHandler);
```

- There are a *lot* of [DOM events](https://developer.mozilla.org/en-US/docs/Web/Events)
- Each event is represented by an `Event` object which is passed as the argument to the callback function
- The `Event` object contains useful information about the specific event that occurred

```js
// console.log the mouse x and y coordinates whenever the body is clicked
const clickHandler = function (event) {
  console.log(event.clientX, event.clientY);
};
document
  .querySelector('body')
  .addEventListener('click', clickHandler);

// we can also remove event handlers using a similar API
document
  .querySelector('body')
  .removeEventListener('click', clickHandler);
```

### jQuery
- A JavaScript library that provides a simple API for DOM manipulation, event handling, and AJAX requests
- Can be referenced with `jQuery` or the `$`
- Typically brought into a project using a **C**ontent **D**elivery **N**etwork or **CDN**
- **CDN**s store code and other files that can be brought into our projects as the browser loads our page

```html
<script src="https://code.jquery.com/jquery-3.7.1.js"></script>
```

- Uses CSS selectors for finding elements in the DOM

```js
// html element
$('h1');
// class
$('.my-class');
// id
$('#my-id');
// nested element
$('.my-class span');
```

### Creating Elements with jQuery
- We can use the same jQuery interface to create DOM elements by passing in the opening tag of an HTML element

```js
const newDiv = $('<div>');
const newImg = $('<img>');

// note the difference between selecting and creating an element
$('img') !== $('<img>');
```

- We can add attributes, event listeners, and even child elements to our created elements and then append to somewhere in the DOM

```js
// create a new image and give it a src attribute
const newImg = $('<img>').attr('src', '/path/to/image.png');

// append the new image to the body element
$('body').append(newImg);
```

### Event Handling with jQuery
- We can also easily attach event listeners to DOM events using jQuery

```js
// using the .on method
$('button').on('click', clickHandler);

// there are several shorthand methods for common DOM events
$('button').click(clickHandler);
$('form').submit(submitHandler);
$('input').focus(focusHandler);
```

### Useful Links
- [MDN: The DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [MDN: browser Events](https://developer.mozilla.org/en-US/docs/Web/Events)
- [What is the `$` in DevTools?](https://thewebivore.com/exactly-wth-is-up-with-in-devtools/)
- [jQuery Docs](https://jquery.com/)
- [jQuery - Beau teaches JavaScript](https://www.youtube.com/playlist?list=PLWKjhJtqVAbkyK9woUZUtunToLtNGoQHB)
