// ** creating a web server
// Capable for accepting request and sending responses/message

// Networking Capability
const http = require("http");

// ***
// Create a web server

const server = http.createServer((req, res) => {
  console.log("req", req);
  res.end("Hello from the server");
});

// Start a web server
server.listen(8000, "127.0.0.1", () => {
  console.log("Listing to request server on port 8000");
});

console.log("Server is running on port 8000");
