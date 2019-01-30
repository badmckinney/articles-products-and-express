const express = require('express');
const router = express.Router();
const productDB = require('../db/products.js');
const database = productDB.getProducts().products;
const middleware = require('../middleware/validate');

router.get('/', (req, res) => {
  const products = productDB.getProducts();
  if (products.length < 1) {
    products.message = "No products in our database";
  } else {
    products.message = "";
  }

  res.status(200);
  return res.render('./products/index', products);
});

router.get('/new', (req, res) => {
  res.status(200);
  return res.render('./products/new', {});
});

router.get('/:id', middleware.validator, (req, res) => {
  const params = req.params;
  const productIndex = productDB.findProduct(params.id);

  const data = {
    name: database[productIndex].name,
    price: database[productIndex].price,
    inventory: database[productIndex].inventory
  }

  res.status(200);
  return res.render('./products/product', data);
});

router.get('/:id/edit', middleware.validator, (req, res) => {
  let params = req.params
  let productIndex = productDB.findProduct(params.id);
  let product = database[productIndex];

  res.status(200);
  return res.render('./products/edit', {
    id: params.id,
    name: product.name,
    price: product.price,
    inventory: product.inventory
  });
});

router.post('/', middleware.validator, (req, res) => {
  const body = req.body;

  productDB.addProduct(body.name, body.price, body.inventory);
  return res.redirect('/products');
});

router.put('/:id', middleware.validator, (req, res) => {
  const body = req.body;
  const params = req.params
  const productIndex = productDB.findProduct(params.id);

  for (var key in body) {
    database[productIndex][key] = body[key];
  }

  res.status(200);
  return res.redirect(`./${params.id}`);
});

router.delete('/:id', middleware.validator, (req, res) => {
  const productID = req.params.id;
  const productIndex = productDB.findProduct(productID);

  database.splice(productIndex, 1);

  const products = productDB.getProducts();
  products.message = "Deletion Successful";
  res.status(200);
  return res.render('./products/index', products);
});

module.exports = router;