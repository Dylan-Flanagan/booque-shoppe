const { Router } = require('express');
const { Author } = require('../models/Author.js');

module.exports = Router()
  // .get('/:id', async (req, res) => {
  //   const Book = await Book;
  // })
  .get('/', async (req, res) => {
    const authors = await Author.getAll();
    res.json(authors);
  })
  .get('/:id', async (req, res) => {
    const authors = await Author.getById(req.params.id);
    const filtered = {
      name: authors.name,
      dob: authors.dob,
      pob: authors.pob,
      books: authors.books.map(({ id, title, release }) => ({
        id,
        title,
        release,
      })),
    };
    res.json(filtered);
  });
