// Callbacks used in synchronous flow
const sayGoodMorning = () => console.log("Good morning");
const sayGoodAfternoon = () => console.log("Good afternoon");

// let action = sayGoodMorning;
// console.log(`First action: ${action}`);
// action = sayGoodAfternoon;
// console.log(`Second action: ${action}`);

// let repeatAction = (callback) => {
//     for (let i = 0; i < 10; i++) {
//         callback();
//     }
// }

// repeatAction(sayGoodMorning);

// Async usage of callbacks
// setTimeout(sayGoodAfternoon, 1000);
// sayGoodMorning()

// fs example
const fs = require("fs")

// let content = fs.readFileSync("./hello.txt", "utf-8")
// console.log(`Hello there, ${content}`);

fs.readFile("./hello.txt", "utf-8", (err, data) => {
    // async readFile
    if (err) {
        console.log("Error encountered:", err)
        return
    }
    // Success
    console.log(`Hello there, ${data}`);
})


