const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

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

//Rotas de mongoose e mongo sandbox
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "Novo Blog",
    snippet: "Sobre o meu novo blog",
    body: "Mais sobre o meu novo blog",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

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
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs", { titulo: "Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/novo", (req, res) => {
  res.render("create", { titulo: "Criar novo Post" });
});
app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  console.log(blog);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

//Rota 404
app.use((req, res) => {
  res.status(404).render("404", { titulo: "404" });
});
