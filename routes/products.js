const express = require('express');
const router = express.Router();
const productDB = require('../db/products.js');
const database = productDB.getProducts().products;

router.get('/', (req, res) => {
  const products = productDB.getProducts();
  if (products.length < 1) {
    products.message = "No products in our database";
  }

  products.message = "";

  res.status(200);
  return res.render('./products/index', products);
});

router.get('/new', (req, res) => {
  res.status(200);
  return res.render('./products/new', {});
});

router.get('/:id', (req, res) => {
  const params = req.params;
  const productIndex = productDB.findProduct(params.id);

  if (typeof productIndex !== 'number') {
    res.status(500);
    return res.json({ "Error": "Couldn't find that product in our database." });
  }

  const data = {
    name: database[productIndex].name,
    price: database[productIndex].price,
    inventory: database[productIndex].inventory
  }

  res.status(200);
  return res.render('./products/product', data);
});

router.get('/:id/edit', (req, res) => {
  let params = req.params;
  let productIndex = productDB.findProduct(params.id);
  let product = database[productIndex];

  if (typeof productIndex !== 'number') {
    return res.render('./products/new', { message: "That product is not in our database, please add it as a new product" });
  }

  res.status(200);
  return res.render('./products/edit', {
    id: params.id,
    name: product.name,
    price: product.price,
    inventory: product.inventory
  });
});

router.post('/', (req, res) => {
  const body = req.body;

  if (body.length < 3) {
    res.render('./products/new', { message: "Please fill out all fields with approppriate information" });
  }

  let added = productDB.addProduct(body.name, body.price, body.inventory);

  if (!added) {
    res.render('./products/new', { message: "Please provide appropriate information to each field. Name should be a string, Price and Inventory should be numbers." });
  }

  return res.redirect('/');
});

router.put('/:id', (req, res) => {
  const body = req.body;
  const params = req.params
  const productIndex = productDB.findProduct(params.id);

  if (!productIndex) {
    let data = { message: "That product is not in our database, please add it as a new product" };

    return res.render('./products/new', data);
  }

  for (var key in params) {
    database[productIndex][key] = body.key;
  }

  res.status(200);
  return res.redirect(`./products/${params.id}`);
});

router.delete('/:id', (req, res) => {
  const productID = req.params.id;
  const productIndex = productDB.findProduct(productID);

  if (typeof productIndex !== 'number') {
    res.status(500);
    return res.json({ "Error": "That product does not exist in our database." })
  }

  database.splice(productIndex, 1);

  const products = productDB.getProducts();
  products.message = "Deletion Successful";
  res.status(200);
  return res.render('./products/index', products);
});

module.exports = router;