// Grab our elements
const h1 = $("h1");
console.log(h1);

const $form = $("form");
const $input = $("#new-to-do"); // document.getElementById()
// selecting the first <ul> on the document
const $ul = $("ul");
// creating a new <ul> element
const $newUl = $("<ul>");

// addEventListender
$form.on("submit", event => {
    event.preventDefault();
    // send a HTTP request in JS to the backend
    // DELETE/PATCH/PUT

    // get the response back

    // append it to the DOM
    const $li = $("<li>");
    $li.text($input.val());
    $ul.append($li);

    $input.val("");

})