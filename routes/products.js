const express = require('express');
const router = express.Router();
const productDB = require('../db/products.js');

router.get('/', (req, res) => {
  let products = productDB.getProducts();

  res.status(200);
  res.render('templates/products/index', products);
});

router.get('/:title', (req, res) => {

});

router.get('/:title/edit', (req, res) => {

});

router.get('/new', (req, res) => {

});

router.post('/', (req, res) => {

});

router.put('/:title', (req, res) => {

});

router.delete('/:title', (req, res) => {

});

module.exports = router;