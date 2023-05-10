const express = require("express");

const app = express();
//View Engines
app.set("view engine", "ejs");

//Server
app.listen(8080);
console.log(`Server running at http://localhost:8080/`);

//Routes
app.get("/", (req, res) => {
  res.render("index", { titulo: "Início" });
});
app.get("/sobre", (req, res) => {
  res.render("about", { titulo: "Sobre", nome: "Filipe" });
});
app.get("/contato", (req, res) => {
  res.render("contact", { titulo: "Contato" });
});
app.get("/blogs", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("blogs", { titulo: "Blogs", blogs });
});
app.get("/blogs/novo", (req, res) => {
  res.render("create", { titulo: "Criar novo Post" });
});
app.use((req, res) => {
  res.status(404).render("404", { titulo: "404" });
});
