const http = require("http");
const fs = require("fs/promises");

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

  let data = await read("./404.html");
  res.statusCode = 200;
  if (req.url === "/") {
    data = await read("./index.html");
  } else if (req.url === "/sobre") {
    data = await read("./about.html");
  } else if (req.url === "/contato") {
    data = await read("./contact-me.html");
  } else {
    res.statusCode = 404;
  }
  res.end(data);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
