//File system Module

const fs = require("fs");
const http = require("http");
const url = require("url");

// RETRIEVING DATA FROM JSON AND CREATING A JAVASCRIPT OBJECT FROM IT
//-------------------------------------------------------------------------------------------

//method 'readFileSync' of fs
// '__dirname' is basically the home folder
const json = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");

// SERVER ROUTING
//-------------------------------------------------------------------------------------------

const laptopData = JSON.parse(json);

const server = http.createServer((request, response) => {
  //
  const pathName = url.parse(request.url, true).pathname;
  const id = url.parse(request.url, true).query.id;

  if (pathName === "/products" || pathName === "/") {
    //let browser know what kind of data we are sending in
    response.writeHead(200, { "Content-type": "text/html" });
    response.end("This is the product page");
    //
  } else if (pathName === "/laptop" && id < laptopData.length) {
    response.writeHead(200, { "Content-type": "text/html" });

    //async function
    fs.readFile(
      `${__dirname}/templates/template-laptop.html`,
      "utf-8",
      (error, data) => {
        const laptop = laptopData[id];
        let output = data.replace("{%PRODUCTNAME%}", laptop.productName);
        let output = output.replace("{%IMAGE%}", laptop.image);
        let output = output.replace("{%PRICE%}", laptop.price);
        let output = output.replace("{%SCREEN%}", laptop.screen);
        let output = output.replace("{%CPU%}", laptop.cpu);
        let output = output.replace("{%STORAGE%}", laptop.storage);
        let output = output.replace("{%RAM%}", laptop.ram);
        let output = output.replace("{%DESCRIPTION%}", laptop.description);
      }
    );
    //
  } else {
    response.writeHead(200, { "Content-type": "text/html" });
    response.end("Url was not found");
  }
});

// SERVER LISTEN
//-------------------------------------------------------------------------------------------

//console.log(__dirname);
// /Users/maxwellkirwin/Desktop/websites/the-js/node/data

//take 'server' we created add listen at a certain port and address
server.listen(1337, "127.0.0.1", () => {
  console.log("Listening for requests");
});
