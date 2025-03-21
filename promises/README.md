# M02W05 - Promises
### To Do
- [] Asynchronosity
- [] Callback review
- [] Error handling with callbacks & the "callback hell" problem
- [] Promises

### Sync vs. Async
- When we program, some operations take longer than others or take an unknown amount of time, e.g. fetching data from an API, opening and reading a file
- While some long-running operation X is in progress, we do not want to just block and wait. Two questions:
  - What if we want to do an operation Y using the result of X or only after X being done?
  - What if we want to do an operation Z *not* dependent on the result of X or the timing of X being done?
- We need ways to schedule logic to occur at a later time.

### Callback review
- We have seen callbacks used for this kind of "scheduling to be run later" need
```js
const sayGoodMorning = () => console.log("Good morning");
const sayGoodAfternoon = () => console.log("Good afternoon");

setTimeout(sayGoodMorning, 1000);
// Is "Having brunch!" printed before or after "Good morning"?
// What about when we put it at the end? Take a guess and run it to confirm
console.log("Having brunch!");
setTimeout(sayGoodAfternoon, 2000);
```

- Callbacks are not only used for asynchronous operations
``` js
// Callbacks used in synchronous flow
const sayGoodMorning = () => console.log("Good morning");
const sayGoodAfternoon = () => console.log("Good afternoon");

// Are callbacks only used for asynchronous actions? NO, synchronous as well
const repeatAction = (amountOfTimes, action) => {
  for (let i = 0; i < amountOfTimes; i++) {
    action();
  }
}
repeatAction(10, sayGoodMorning)
```

### Error handling with callbacks & the "callback hell" problem
- JavaScript's try-catch block is used for error handling
``` js
try {
    const abc = '123';
    abc = 'abc'; // should error out, cannot re-assign a const variable a new value
    console.log("should not be printed out");
} catch (error) {
    console.log('Something went wrong!');
}
console.log("CONTINUE AS USUAL");
```

- This simple way of using try-catch does *not* work with async operations, because execution moves on without waiting for the result of of the async operation.
```js
const fs = require('fs');
try {
  const fileContent = fs.readFile("./helllo.txt", "utf-8", () => {});
  console.log(fileContent);
  console.log("should not be printed out");
} catch(error) {
  console.log("An error is caught: ", error);
}
```

- Instead, the error is passed to our callback as an argument (often the first argument in Node standard library), leading to code like this:
```js
  const fileContent = fs.readFile("./helllo.txt", "utf-8", (error, data) => {
    if (error) {
      console.log("ERROR IN CALLBACK: ", error);
      return;
    }

    fs.readFile(content, "utf-8", (error, data) => {
      if (error) {
        console.log("ERROR IN NESTED CALLBACK");
        return;
      }
      // callback hell spawning...
    })

  });
```

- Deeply-nested callbacks become deeply-indented code hard to reason about and to modify, even managing pairs of opening/closing brackets/braces are error-prone.

### Promises & error handling with Promises
- Promise: an object that may (or may not) resolve to a value in the future
- An alternative syntax for easier async programming
- A promise has three states:
  * ⏳ Pending  (In-Progress)
  * ✅ Fulfilled (Completed Successfully)
  * ❌ Rejected (an Error Occurred)
- When we define a promise, we should account for both a success (resolve) and failure (reject) case.

- A Promise can be created by the `Promise` class
``` js
// Use the promise constructor to create a new promise.
// We pass in a callback with two arguments:
// 1. resolve (lets the promise know the intended action succeeded)
// 2. reject (lets the promise know the intended action failed)
const myFirstPromise = new Promise((resolve, reject) => {
    // do some long-running operation X that could potentially fail

    // If X succeeds...
    resolve(); // You can pass a value to a next step here if you'd like.
    // If X fails...
    reject(); // You can pass a value to a next step here if you'd like.
});

myFirstPromise
  .then(() => {
    // do something
  });
```

- What does promise-based (synchronous) code look like? Here is an example that has a 50% chance of succeeding or failing.
```js
const randomPromise = new Promise((resolve, reject) => {
    const randNum = Math.random(); // Generate a num between 0 and 1.

    // This promise should SUCCEED 50% of the time...
    if (randNum > 0.5) {
        resolve('Success!');
    } else { // and FAIL 50% of the time...
        reject('Failure!');
    }
});

// How do we use a promise? Call it by name.
randomPromise
    // A .then() will run if the promise is resolved.
    // .then() takes a callback as an argument.
    // The callback receives the value entered into your resolve()
    .then((message) => {
      console.log(message);
    })
    // A .catch() will run if the promise is rejected.
    // .then() takes a callback as an argument.
    // The callback receives the value entered into your reject()
    .catch((error) => {
      console.log(error);
    });
```

- A promise is an object of class `Promise`. It has `.then()` and `.catch()` as chainable methods for us to carry out numerous actions at necessary stages of our application.
```js
const randomPromise = new Promise((resolve, reject) => {
    const randNum = Math.random(); // Generate a num between 0 and 1.

    // This promise should SUCCEED 50% of the time...
    if (randNum > 0.5) {
        resolve(randNum);
    } else { // and FAIL 50% of the time...
        reject('Failure!', randNum);
    }
});

// How do we use a promise? Call it by name.
const p = randomPromise
    .then((result) => {
      console.log("I got a good number");
      return result;
    })
    .then((result) => {
      console.log(generatedNum);
    })
    .catch((error) => {
      console.log(error);
    });
```

- Promises help us to avoid the _callback hell_
- Promises also allow us to handle any errors in the _Promise chain_ with a single `.catch()` on the end of the chain

## Useful links
- [Visualizing JS Promises](https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke)
- [Javascript Event Loop](https://www.youtube.com/watch?v=eiC58R16hb8)
- [Promises From The Ground Up](https://www.joshwcomeau.com/javascript/promises/)
- [Promise API](https://javascript.info/promise-api)