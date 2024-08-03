// Reading and Writing Data in file system
const fs = require("fs");

// Reading a file

const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

const textOut = `This is ${textIn} created By ${Date.now()}`;

console.log("textIn", textOut);

// Write File
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File written");
