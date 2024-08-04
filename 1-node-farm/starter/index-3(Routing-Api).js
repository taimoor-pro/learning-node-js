// Routing (e.g. http://127.0.0.1:8000)
const fs = require("fs");
const http = require("http");
const url = require("url");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
  console.log("Request URL:", req.url);
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW!");
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT!");
  } else if (pathName === "/api") {
    // API's
    // better then . is use __dirname
    // Ek hi bar hit hoagg or ek hi baar ka data hai so baar baar async not neeed
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    //   const productData = JSON.parse(data);
    //   res.writeHead(200, {
    //     "Content-Type": "application/json",
    //   });
    //   res.end(data);
    // });

    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-own-header":
        "hello-world (koi zarurt nahi hai ap ko server pr hit krny ki!!)",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server is running on port 8000");
});
