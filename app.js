const express = require("express");

const app = express();

//Server
app.listen(8080);
console.log(`Server running at http://localhost:8080/`);

//Routes
app.get("/", (req, res) => {
  res.sendFile("./views/index.html", {
    root: __dirname,
  });
  req.statusCode = 200;
});
app.get("/sobre", (req, res) => {
  res.sendFile("./views/about.html", {
    root: __dirname,
  });
});
app.get("/contato", (req, res) => {
  res.sendFile("./views/contact-me.html", {
    root: __dirname,
  });
});
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", {
    root: __dirname,
  });
});
