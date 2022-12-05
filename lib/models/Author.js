const pool = require('../utils/pool.js');

class Author {
  id;
  name;
  dob;
  pob;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
    this.books = row.books;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT id, name from authors');
    return rows.map((authorRow) => new Author(authorRow));
  }
  static async getById(id) {
    const { rows } = await pool.query(
      `select authors.*,
      coalesce(
        json_agg(to_jsonb(books))
        filter(WHERE books.id IS NOT NULL), '[]') as books 
        from authors left join books_authors
          on authors.id = books_authors.authors_id
        left join books
          on books.id = books_authors.books_id
        where authors.id = $1
        group by authors.id;
     `,
      [id]
    );
    return new Author(rows[0]);
  }
}
module.exports = { Author };
