const express = require('express');
const router = express.Router();
const middleware = require('../middleware/validate');
const knex = require('../db');

/************************
 *  GET
************************/

router.get('/', (req, res) => {
  const articles = knex('articles');
  articles.then((list) => {
    const data = {};
    data.articles = list;

    if (list.length < 1) {
      data.message = "No products in our database";
    } else {
      data.message = "";
    }

    res.status(200);
    return res.render('./articles/index', data);
  });
});

router.get('/new', (req, res) => {
  res.status(200);
  return res.render('./articles/new', { message: "" });
});

router.get('/:title', middleware.validator, (req, res) => {
  const title = req.params.title;
  const article = knex('articles').where({ title: `${title}` });
  article.then((item) => {
    const data = {
      title: item[0].title,
      author: item[0].author,
      body: item[0].body
    }

    res.status(200);
    return res.render('./articles/article', data);
  }).catch(console.log);
});

router.get('/:title/edit', middleware.validator, (req, res) => {
  let title = req.params.title;
  const article = knex('articles').where({ title: `${title}` });
  article.then((item) => {
    res.status(200);
    return res.render('./articles/edit', {
      title: item[0].title,
      author: item[0].author,
      body: item[0].body,
    });
  });
});

/************************
 *  POST
************************/

router.post('/', middleware.validator, (req, res) => {
  const body = req.body;

  knex('articles').insert({ title: body.title, author: body.author, body: body.body })
    .then(() => {
      return res.redirect('/articles');
    });
});

/************************
 *  PUT
************************/

router.put('/:title', middleware.validator, (req, res) => {
  console.log(req.url);
  const body = req.body;
  const title = encodeURIComponent(req.body.title);

  knex('articles')
    .where({ title: req.params.title })
    .update({
      title: body.title,
      author: body.author,
      body: body.body
    })
    .then(() => {
      res.status(200);
      return res.redirect(`./${title}`);
    });
});

/************************
 *  DELETE
************************/

router.delete('/:title', middleware.validator, (req, res) => {
  const title = decodeURIComponent(req.params.title);

  knex('articles')
    .where({ title: title })
    .del()
    .then(() => {
      const articles = knex('articles');

      articles.then((list) => {
        const data = {};
        data.articles = list;
        articles.message = "Deletion Successful";
        res.status(200);
        return res.render('./articles/index', data);
      });
    });
});

module.exports = router;