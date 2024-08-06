const express = require("express");
const router = express.Router();
const Author = require("../models/author");

// In-memory database
let authors = [];
let authorIdCounter = 1;

// Get all authors
router.get("/", (req, res) => {
  res.json(authors);
});

// Get author by ID
router.get("/:id", (req, res) => {
  const author = authors.find((a) => a.id === parseInt(req.params.id));
  if (author) {
    res.json(author);
  } else {
    res.status(404).json({ message: "Author not found" });
  }
});

// Add a new author
router.post("/", (req, res) => {
  const author = new Author(
    authorIdCounter++,
    req.body.name,
    req.body.bio,
    req.body.website
  );
  authors.push(author);
  res.status(201).json(author);
});

// Update author details
router.patch("/:id", (req, res) => {
  const author = authors.find((a) => a.id === parseInt(req.params.id));
  if (author) {
    if (req.body.name != null) author.name = req.body.name;
    if (req.body.bio != null) author.bio = req.body.bio;
    if (req.body.website != null) author.website = req.body.website;
    res.json(author);
  } else {
    res.status(404).json({ message: "Author not found" });
  }
});

// Delete an author
router.delete("/:id", (req, res) => {
  authors = authors.filter((a) => a.id !== parseInt(req.params.id));
  res.json({ message: "Author deleted" });
});

module.exports = router;
