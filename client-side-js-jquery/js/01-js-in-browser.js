console.log("Hello world!");
console.log("This is JS in the browser!");

console.log(document.title);
document.title = "This is a new title"

// Manipulate DOM nodes
// print out <h1> element text value
let h1Text = document.querySelector('h1').textContent
h1Text = document.getElementById("welcome").textContent;
console.log(h1Text)

// add an item this list
const li = document.createElement("li");
const liText = document.createTextNode("Four");
li.appendChild(liText);
const ul = document.getElementById("main-list");
ul.appendChild(li);
