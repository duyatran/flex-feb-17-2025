// Use the Promise contructor to define a promise
// We pass in a callback with two arguments
// 1. resolve (lets the promise know that the intended action succeeded)
// 2. reject (lets the promise know that the intended action failed)
// definition

let name = "Duy"
name = "Duy Tran"

const randomPromise = new Promise((resolve, reject) => {
    console.log("start of promise");
    const randomNum = Math.random();

    if (randomNum > 0.5) {
        console.log("Success");
        resolve("Success!");
    } else {
        console.log("Failure");
        reject("Failure!")
    }
})

console.log("after randomPromise definition");

// Using the promise - schedule some actions to be done when
// the promise resolves/rejects
randomPromise
    .then((message) => {
        console.log(message)
    })
    .catch((error) => {
        console.log(error)
    })

setTimeout(() => { console.log("setTimeout hello") }, 0);
console.log("the end");
