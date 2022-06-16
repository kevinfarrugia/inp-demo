import { readFileSync } from "fs";
import { createServer } from "http";
import path from "path";

import index from "./templates/index.js";
import client from "./templates/client.js";
import submit from "./templates/submit.js";

const handler = (req, res) => {
  const file = path.join(process.cwd(), req.url.substring(1));
  const stringified = readFileSync(file, "utf8");

  res.setHeader("Content-Type", "application/javascript");
  return res.end(stringified);
};

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

  if (request.url.match(/^\/public/)) {
    return handler(request, response);
  }

  const { pathname } = new URL(request.url, `http://${request.headers.host}`);

  switch (pathname.replace(/(.+)\/$/, "$1")) {
    case "/submit": {
      doSomething(80);
      response.writeHead(200);
      response.end(submit);
      break;
    }
    case "/client": {
      response.writeHead(200);
      response.end(client);
      break;
    }
    case "/": {
      response.writeHead(200);
      response.end(index);
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
