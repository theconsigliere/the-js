//File system Module

const fs = require("fs");
const http = require("http");
const url = require("url");

// RETRIEVING DATA FROM JSON AND CREATING A JAVASCRIPT OBJECT FROM IT
//-------------------------------------------------------------------------------------------

//method 'readFileSync' of fs
// '__dirname' is basically the home folder
const json = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");

// SERVER
//-------------------------------------------------------------------------------------------

const laptopData = JSON.parse(json);

const server = http.createServer((request, response) => {
  //
  url.parse(request.url, true);

  //let browser know what kind of data we are sending in
  response.writeHead(200, { "Content-type": "text/html" });
  //
  response.end("This is the response");
});

//console.log(__dirname);
// /Users/maxwellkirwin/Desktop/websites/the-js/node/data

//take 'server' we created add listen at a certain port and address
server.listen(1337, "127.0.0.1", () => {
  console.log("Listening for requests");
});
