const express = require("express");

const app = express();
//View Engines
app.set("view engine", "ejs");

//Server
app.listen(8080);
console.log(`Server running at http://localhost:8080/`);

//Routes
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/sobre", (req, res) => {
  res.render("about");
});
app.get("/contato", (req, res) => {
  res.render("contact");
});
app.use((req, res) => {
  res.status(404).render("404");
});
