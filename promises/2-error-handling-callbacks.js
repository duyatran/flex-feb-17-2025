// Try-catch
const fs = require("fs");
try {
    fs.readFile("./hello1.txt", "utf-8", (err, data) => {
        if (err) {
            console.log("Error encountered:", err)
            return
        }
        // Success
        console.log(`Hello there, ${data}`);
    })
    console.log("The end of try block");
} catch (error) {
    console.log("Something is wrong: ", error);
}