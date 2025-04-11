// DOM events
const h1 = document.querySelector("h1");
h1.addEventListener("click", (event) => {
    console.log(event);
    window.alert("h1 is clicked!");
})
const p = document.querySelector("p");
p.addEventListener("click", (event) => {
    event.stopPropagation()
    console.log(event);
    window.alert("p is clicked!");
})


const form = document.querySelector('form');
const input = document.getElementById("new-to-do");
const ul = document.querySelector("ul");

form.addEventListener("submit", event => {
    // default: submit navigates to a different page (POST/GET action)
    // prevent that and do our own thing
    event.preventDefault();

    // console.log(event.target);
    // Create a new <li>
    const liElement = document.createElement("li");

    // Get the text from user input, set li's textContent to it
    console.log(input.value);
    const userInput = input.value
    liElement.textContent = userInput
    // Append the element to the page
    ul.appendChild(liElement);

    // Clear the output
    input.value = ""

});
