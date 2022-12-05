const pool = require('../utils/pool.js');

class Book {
  id;
  title;
  release;
  authors;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.release = row.release;
    this.authors = row.authors;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from books');
    return rows.map((bookRow) => new Book(bookRow));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `select books.*,
      coalesce(
        json_agg(to_jsonb(authors))
        filter(WHERE authors.id IS NOT NULL), '[]') as authors 
        from books left join books_authors
          on books.id = books_authors.books_id
        left join authors
          on authors.id = books_authors.authors_id
        where books.id = $1
        group by books.id;
     `,
      [id]
    );
    return new Book(rows[0]);
  }
}

module.exports = { Book };
