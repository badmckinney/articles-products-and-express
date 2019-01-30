const express = require('express');
const router = express.Router();
const articleDB = require('../db/articles.js');
const database = articleDB.getArticles().articles;

router.get('/', (req, res) => {
  const articles = articleDB.getArticles();
  if (articles.length < 1) {
    articles.message = "No products in our database";
  } else {
    articles.message = "";
  }

  res.status(200);
  return res.render('./articles/index', articles);
});

router.get('/new', (req, res) => {
  res.status(200);
  return res.render('./articles/new', { message: "" });
});

router.get('/:title', (req, res) => {
  const params = req.params;
  const articleIndex = articleDB.findArticle(params.title);

  if (typeof articleIndex !== 'number') {
    res.status(500);
    return res.json({ "Error": "Couldn't find that product in our database." });
  }

  const data = {
    title: database[articleIndex].title,
    author: database[articleIndex].author,
    body: database[articleIndex].body
  }

  res.status(200);
  return res.render('./articles/article', data);
});

router.get('/:title/edit', (req, res) => {
  let params = req.params;
  let articleIndex = articleDB.findArticle(params.title);
  let article = database[articleIndex];

  if (typeof articleIndex !== 'number') {
    return res.render('./article/new', { message: "That article is not in our database, please add it as a new article" });
  }

  res.status(200);
  return res.render('./articles/edit', {
    title: article.title,
    author: article.author,
    body: article.body,
  });
});

router.post('/', (req, res) => {
  const body = req.body;

  if (body.length < 3) {
    res.render('./products/new', { message: "Please fill out all fields with approppriate information" });
  }

  articleDB.addArticle(body.title, body.author, body.body);
  return res.redirect('/articles');
});

router.put('/:title', (req, res) => {
  debugger;
  const body = req.body;
  const params = req.params
  const formattedParam = params.title.split(' ').join('').toLowerCase();
  const articleIndex = articleDB.findArticle(params.title);

  if (typeof articleIndex !== 'number') {
    let data = { message: "That article is not in our database, please add it as a new article" };

    return res.render('./articles/new', data);
  }

  for (var key in body) {
    database[articleIndex][key] = body[key];
  }

  res.status(200);
  return res.redirect(`./${formattedParam}`);
});

router.delete('/:title', (req, res) => {
  const articleTitle = req.params.title;
  const articleIndex = articleDB.findArticle(articleTitle);

  if (typeof articleIndex !== 'number') {
    res.status(500);
    return res.json({ "Error": "That product does not exist in our database." })
  }

  database.splice(articleIndex, 1);

  const articles = articleDB.getArticles();
  articles.message = "Deletion Successful";
  res.status(200);
  return res.render('./articles/index', articles);
});

module.exports = router;