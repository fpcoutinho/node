const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blog-routes");

const app = express();

//Conexão ao MongoDB
const uri =
  "mongodb+srv://filcoutinho:mwYtV1kwGm4nX61N@nodetutorial.ojtsrqk.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Successful connection to the Database");
    //Server
    app.listen(8080);
    console.log(`Server running at http://localhost:8080/`);
  })
  .catch((err) => {
    console.log(err);
  });

//View Engine ejs
app.set("view engine", "ejs");

//Middleware e Static files
app.use(morgan("dev"));
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));

//Rotas padrão
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/sobre", (req, res) => {
  res.render("about", { titulo: "Sobre", nome: "Filipe" });
});
app.get("/contato", (req, res) => {
  res.render("contact", { titulo: "Contato" });
});

//Rotas de blogs
app.use("/blogs", blogRoutes);

//Rota 404
app.use((req, res) => {
  res.status(404).render("404", { titulo: "404" });
});
