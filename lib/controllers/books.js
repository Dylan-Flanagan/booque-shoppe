const { Router } = require('express');
const { Book } = require('../models/Book.js');

module.exports = Router()
  // .get('/:id', async (req, res) => {
  //   const Book = await Book;
  // })
  .get('/', async (req, res) => {
    const books = await Book.getAll();
    res.json(books);
  })
  .get('/:id', async (req, res) => {
    const books = await Book.getById(req.params.id);
    const filtered = {
      title: books.title,
      release: books.release,
      authors: books.authors.map(({ id, name }) => ({ id, name })),
    };
    res.json(filtered);
  });
