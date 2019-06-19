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

  // PRODUCTS OVERVIEW
  if (pathName === '/products' || pathName === '/') {
    response.writeHead(200, { 'Content-type': 'text/html' });

    fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
      let overviewOutput = data;

      fs.readFile(`${__dirname}/templates/template-card.html`, 'utf-8', (err, data) => {

        const cardsOutput = laptopData.map(el => replaceTemplate(data, el)).join('');
        overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput);

        response.end(overviewOutput);
      });
    });


  }

  //LAPTOP DETAIL
  else if (pathName === "/laptop" && id < laptopData.length) {
    response.writeHead(200, { "Content-type": "text/html" });

    //async function
    fs.readFile(
      `${__dirname}/templates/template-laptop.html`,
      "utf-8",
      (error, data) => {
        const laptop = laptopData[id];
        const output = replaceTemplate(data, laptop);
        response.end(output);
      }
    )

    //IMAGES
  } else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) {
    fs.readFile(`${__dirname}/data/img${pathName}`, (error, data) => {
      response.writeHead(200, { "Content-type": "image/jpg" });
      response.end(data)
    })

  }

  //URL NOT FOUND
  else {
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

// REPLACE TEMPLATES
//-------------------------------------------------------------------------------------------

function replaceTemplate(originalHtml, laptop) {
  let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
  output = output.replace(/{%IMAGE%}/g, laptop.image);
  output = output.replace(/{%PRICE%}/g, laptop.price);
  output = output.replace(/{%SCREEN%}/g, laptop.screen);
  output = output.replace(/{%CPU%}/g, laptop.cpu);
  output = output.replace(/{%STORAGE%}/g, laptop.storage);
  output = output.replace(/{%RAM%}/g, laptop.ram);
  output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
  output = output.replace(/{%ID%}/g, laptop.id);
  return output;
}
