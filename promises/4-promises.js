const fs = require("fs")
const fsPromises = fs.promises

let name = null;
fsPromises.readFile("./hello.txt", "utf-8")
    .then((fileName) => {
        name = fileName;
        console.log(`Name of the file: ${fileName}`);
        return fsPromises.readFile(fileName, "utf-8");
    })
    .then((nameData) => {
        console.log("Secret message: ", nameData);
    })
    .catch((error) => {
        console.log("Error encountered: ", error);
    })
