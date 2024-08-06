const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

const authorsRouter = require("./routes/authors");
const booksRouter = require("./routes/books");

app.use("/authors", authorsRouter);
app.use("/books", booksRouter);

module.exports = app;
