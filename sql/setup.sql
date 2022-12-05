-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS books_authors; 


CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    released INT NOT NULL
);

INSERT INTO books (title, released) 

VALUES 
  ('Do Androids Dream of Electric Sheep?', 1968),
  ('Infinite Jest', 1996),
  ('Kafka on the Shore', 2002),
  ('1Q84', 2009),
  ('Haunted', 2005),
  ('Diary: a novel', 2003),
  ('Slaughterhouse-Five', 1969);


CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    dob DATE,
    pob VARCHAR
);

INSERT INTO authors (name, dob, pob)


VALUES 
  ('Haruki Murakami','1949-01-12', 'Kyoto'),
  ('David Foster Wallace','1962-02-21', 'Ithaca'),
  ('Kurt Vonnegut','1922-11-11', 'Indianapolis'),
  ('Chuck Palahniuk','1962-02-21', 'Pasco'),
  ('Philip K. Dick','1928-12-16', 'Chicago');


CREATE TABLE books_authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    authors_id INT,
    books_id INT,
    FOREIGN KEY (authors_id) REFERENCES authors(id),
    FOREIGN KEY (books_id) REFERENCES books(id)
);

INSERT INTO books_authors (authors_id, books_id)

VALUES
  (1,3),
  (1,4),
  (2,2),
  (3,7),
  (4,5),
  (4,6),
  (5,1);