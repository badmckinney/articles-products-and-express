const express = require('express');
const router = express.Router();
const middleware = require('../middleware/validate');
const knex = require('../db');

/************************
 *  GET
************************/

router.get('/', (req, res) => {
  const products = knex('products');
  products.then((list) => {
    const data = {};
    data.products = list;

    if (list.length < 1) {
      data.message = "No products in our database";
    } else {
      data.message = "";
    }

    res.status(200);
    return res.render('./products/index', data);
  });
});

router.get('/new', (req, res) => {
  res.status(200);
  return res.render('./products/new', {});
});

router.get('/:id', middleware.validator, (req, res) => {
  let id = req.params.id;

  knex('products').where({ id: id })
    .then((product) => {
      const data = {
        id: id,
        name: product[0].name,
        price: product[0].price,
        inventory: product[0].inventory
      }

      res.status(200);
      return res.render('./products/product', data);
    });
});

router.get('/:id/edit', middleware.validator, (req, res) => {
  let id = req.params.id;

  knex('products').where({ id: id })
    .then((product) => {

      res.status(200);
      return res.render('./products/edit', {
        id: product[0].id,
        name: product[0].name,
        price: product[0].price,
        inventory: product[0].inventory
      });
    });
});

/************************
 * POST
************************/

router.post('/', middleware.validator, (req, res) => {
  const body = req.body;

  knex('products').insert({ name: body.name, price: body.price, inventory: body.inventory })
    .then(() => {
      return res.redirect('/products');
    });
});

/************************
 *  PUT
************************/

router.put('/:id', middleware.validator, (req, res) => {
  const body = req.body;
  const id = req.params.id;

  knex('products')
    .where({ id: id })
    .update({
      name: body.name,
      price: body.price,
      inventory: body.inventory
    })
    .then(() => {
      res.status(200);
      return res.redirect(`./${id}`);
    });
});

// /************************
//  *  DELETE
// ************************/

router.delete('/:id', middleware.validator, (req, res) => {
  const id = req.params.id

  knex('products')
    .where({ id: id })
    .del()
    .then(() => {
      knex('products')
        .then((list) => {
          const data = {};
          data.products = list;
          data.message = "Deletion Successful";
          res.status(200);
          return res.render('./products/index', data);
        });
    });
});

module.exports = router;