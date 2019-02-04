\c badmckinney
DROP DATABASE articles_and_products;
CREATE DATABASE articles_and_products;

\c articles_and_products

CREATE TABLE articles (
  id    SERIAL PRIMARY KEY,
  title    varchar(90) UNIQUE,
  author    varchar(45),
  body    varchar(510)
);

CREATE TABLE products (
  id    SERIAL PRIMARY KEY,
  name    varchar(45) UNIQUE,
  price    integer,
  inventory    integer
);

INSERT INTO articles (title, author, body) VALUES ('Y2K', 'Bill Gates', 'Its the end of the world');
INSERT INTO products (name, price, inventory) VALUES ('banana', 1, 1);

SELECT * FROM articles;
SELECT * FROM products;
