import { createServer } from "http";
import fs from "fs";

// imitates a CPU intenstive operation
const doSomething = (baseNumber) => {
  if (baseNumber > 100) {
    throw new Error("Please use a scale of 0-100.");
  }

  let result = 0;
  for (let i = Math.pow(baseNumber, 4); i >= 0; i--) {
    result += Math.atan(i) * Math.tan(i);
  }
};

const server = createServer((request, response) => {
  // error handling
  request.on("error", (err) => {
    console.error(err);
    response.writeHead(500);
    response.end();
  });

  response.on("error", (err) => {
    console.error(err);
  });

  // don't handle requests for /favicon.ico
  if (request.url === "/favicon.ico") {
    response.writeHead(404);
    response.end();
    return;
  }

  if (request.url.match(/\.js$/)) {
    const file = fs.readFileSync(request.url.substring(1), "utf8");

    if (file) {
      response.writeHead(200, { "Content-Type": "application/javascript" });
      response.end(file);
    }
  }

  const { pathname } = new URL(request.url, `http://${request.headers.host}`);

  switch (pathname.replace(/(.+)\/$/, "$1")) {
    case "/submit": {
      doSomething(100);
      response.writeHead(200);

      const html = fs.readFileSync("./submit.html");
      response.end(html);

      break;
    }
    case "/client": {
      doSomething(10);
      response.writeHead(200);

      const html = fs.readFileSync("./client.html");
      response.end(html);

      break;
    }
    case "/": {
      doSomething(10);
      response.writeHead(200);

      const html = fs.readFileSync("./index.html");
      response.end(html);

      break;
    }
    default: {
      response.writeHead(404);
      response.end();
      break;
    }
  }
});

server.listen(3000);

console.log("Server started on http://localhost:3000");
