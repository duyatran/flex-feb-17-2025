// This callback pattern encourages nesting code
const fs = require("fs");

fs.readFile("./hello.txt", "utf-8", (err, data) => {
    if (err) {
        console.log("Error encountered:", err)
        return
    }
    // Success
    console.log(`Name of the file: ${data}`);

    fs.readFile(data, "utf-8", (err, msg) => {

        if (err) {
            console.log("Error encountered:", err)
            return
        }
        // Success
        console.log(`Secret message: ${msg}`);

    })
})