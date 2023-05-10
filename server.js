const http = require("http");
const fs = require("fs/promises");
const _ = require("lodash");

const hostname = "localhost";
const port = 8080;

async function read(url) {
  try {
    const data = await fs.readFile(url, {
      encoding: "utf8",
    });
    return data;
  } catch (err) {
    console.log(err);
  }
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "text/html");

  let path = "./html/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/sobre":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/contato":
      path += "contact-me.html";
      res.statusCode = 200;
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  const data = await read(path);
  res.end(data);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
