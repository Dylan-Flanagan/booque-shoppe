const pool = require('../utils/pool.js');

class Book {
  id;
  title;
  release;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.release = row.release;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from books');
    return rows.map((bookRow) => new Book(bookRow));
  }
}
class BooksWAuthors {
  title;
  release;
  authors;

  constructor(row) {
    this.title = row.title;
    this.release = row.release;
    this.authors =
      row.authors.length > 0
        ? row.authors.map(({ id, name }) => ({ id, name }))
        : [];
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `select books.*,
    coalesce(
      json_agg(to_jsonb(authors))
      filter(WHERE authors.id IS NOT NULL), '[]' as authors 
      from books left join books_authors
        on books.id = books_authors.book_id
      left join authors
        on authors.id = books_authors.author_id
      where books.id = $1
      group by books.id;
    )`[id]
    );
    const newBooksWAuthors = new BooksWAuthors(rows[0]);
    return newBooksWAuthors;
  }
}

module.exports = { Book, BooksWAuthors };
