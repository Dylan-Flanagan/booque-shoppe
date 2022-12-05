const { Router } = require('express');
const { Book } = require('../models/book.js');

module.exports = Router()
  // .get('/:id', async (req, res) => {
  //   const Book = await Book;
  // })
  .get('/', async (req, res) => {
    const books = await Book.getAll();
    res.json(books);
  });
