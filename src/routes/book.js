const express = require("express");
const router = express.Router();
const Book = require("../models/book");

// In-memory database
let books = [];
let bookIdCounter = 1;

// Get all books
router.get("/", (req, res) => {
  res.json(books);
});

// Get book by ID
router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Add a new book
router.post("/", (req, res) => {
  const book = new Book(
    bookIdCounter++,
    req.body.title,
    req.body.description,
    req.body.author,
    req.body.publishedDate
  );
  books.push(book);
  res.status(201).json(book);
});

// Update book details
router.patch("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    if (req.body.title != null) book.title = req.body.title;
    if (req.body.description != null) book.description = req.body.description;
    if (req.body.author != null) book.author = req.body.author;
    if (req.body.publishedDate != null)
      book.publishedDate = req.body.publishedDate;
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Delete a book
router.delete("/:id", (req, res) => {
  books = books.filter((b) => b.id !== parseInt(req.params.id));
  res.json({ message: "Book deleted" });
});

module.exports = router;
