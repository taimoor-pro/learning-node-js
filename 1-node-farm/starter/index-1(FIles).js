// Reading and Writing Data in file system
const fs = require("fs");

//* Reading and writing file synchronously!!!
// ** Blocking (Synchronous Js)
// Reading a file
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

const textOut = `This is ${textIn} created By ${Date.now()}`;

console.log("textIn", textOut);

// Write File
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File written");

console.log("\n\n\\n\n\n");
//* Reading and writing file asynchronously!!!
// ** Non-Blocking (Async)
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("Error ."); //! if error so all below function (continuously callback hell) not run
  // Second Read file depends on first one
  //   Callback hell
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log("data2", data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log("data read-this file: ", data3);
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("Your file has been written ��");
      });
    });
  });
});

console.log("Reading file...");

fs.writeFile(
  "./txt/writeasync.txt",
  "this is my data\n hello beta",
  (err, data) => {
    console.log("write data: ", data);
  }
);

console.log("Writing file...");
