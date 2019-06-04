const knex = require('../db');
knex('products')
  .then(console.log);
module.exports = {
  validator: function (req, res, next) {

    /************************
     *  ARTICLES
    ************************/
    if (req.originalUrl.slice(0, 9) === '/articles') {
      const encodedTitle = encodeURIComponent(req.params.title);
      const title = decodeURIComponent(req.params.title);

      // GET '/:title'
      if (req.method === 'GET' && req.url === `/${encodedTitle}`) {
        return knex('articles').where({ title: title })
          .then((item) => {
            if (item.length < 1) {
              res.status(500);
              return res.json({ "Error": "Couldn't find that article in our database." });
            }
            return next();
          })
          .catch((err) => {
            console.log(err);
            next();
          });
      }

      // GET '/:title/edit'
      if (req.method === 'GET' && req.url === `/${encodedTitle}/edit`) {
        return knex('articles').where({ title: title })
          .then((item) => {
            if (item.length < 1) {
              res.status(200);
              return res.render('./articles/new', { message: "That article is not in our database, please add it as a new article" });
            }
            return next();
          })
          .catch((err) => {
            console.log(err);
            next();
          });
      }

      // POST '/articles'
      if (req.method === 'POST' && req.url === '/') {
        let body = req.body;

        if (Object.keys(body).length < 3) {
          return res.render('./products/new', { message: "Please fill out all fields with approppriate information" });
        }

        for (var key in body) {
          if (body[key].length < 2) {
            return res.render('./products/new', { message: "Please fill out all fields with approppriate information" });
          }

          if (!isNaN(parseInt(body[key]))) {
            return res.render('./products/new', { message: "Please fill out all fields with approppriate information" });
          }
        }

        next();
      }

      // PUT '/:title'

      if (req.method === "PUT" && req.url === `/${encodedTitle}?_method=PUT`) {
        let body = req.body;

        knex('articles').where({ title: title })
          .then((item) => {
            if (item.length < 1) {
              res.status(500);
              return res.json({ "Error": "Couldn't find that article in our database." });
            }

            for (var key in body) {
              if (body[key].length < 2 || !isNaN(parseInt(body[key]))) {
                return res.render(`./articles/edit`, {
                  title: item.title,
                  author: item.price,
                  body: item.body,
                  message: "Please fill out all fields with approppriate information"
                });
              }
            }

            return next();
          })
          .catch((err) => {
            console.log(err);
            next();
          });
      }

      // DELETE '/:title'
      if (req.method === "DELETE" && req.url === `/${encodedTitle}`) {
        return knex('articles').where({ title: title })
          .then((item) => {
            if (item.length < 1) {
              res.status(500);
              return res.json({ "Error": "Couldn't find that article in our database." });
            }
            return next();
          })
          .catch((err) => {
            console.log(err);
            next();
          });
      }
    }


    /************************
    *  PRODUCTS
    ************************/
    const id = req.params.id;

    // GET '/:id'
    if (req.method === 'GET' && req.url === `/${id}`) {
      return knex('products').where({ id: id })
        .then((product) => {
          if (product.length < 1) {
            res.status(500);
            return res.json({ "Error": "Couldn't find that product in our database." });
          }
          return next();
        })
        .catch((err) => {
          console.log(err);
          next();
        });
    }

    // GET '/:id/edit'
    if (req.method === "GET" && req.url === `/${id}/edit`) {
      return knex('products').where({ id: id })
        .then((product) => {
          if (product.length < 1) {
            res.status(500);
            return res.json({ "Error": "Couldn't find that product in our database." });
          }
          return next();
        })
        .catch((err) => {
          console.log(err);
          next();
        });
    }

    // POST '/'
    if (req.method === "POST" && req.url === '/') {
      const body = req.body;

      if (body.length < 3) {
        return res.render('./products/new', { message: "Please fill out all fields with approppriate information" });
      }

      if (!isNaN(parseInt(body.name)) || isNaN(parseInt(body.price)) || isNaN(parseInt(body.inventory))) {
        return res.render('./products/new', { message: "Please provide appropriate information to each field. Name should be a string, Price and Inventory should be numbers." });
      }

      next();
    }

    // PUT '/:id'
    if (req.method === "PUT" && req.url === `/${id}?_method=PUT`) {
      let id = req.params.id;
      let body = req.body;

      knex('products')
        .where({ id: id })
        .then((product) => {
          if (product.length < 1) {
            let data = { message: "That product is not in our database, please add it as a new product" };
            return res.render('./products/new', data);
          }

          if (!isNaN(parseInt(body.name)) || isNaN(parseInt(body.price)) || isNaN(parseInt(body.inventory))) {
            return res.render(`./products/edit`, {
              id: params.id,
              name: product[0].name,
              price: product[0].price,
              inventory: product[0].inventory,
              message: "Please provide appropriate information to each field. Name should be a string, Price and Inventory should be numbers."
            });
          }
        });

      next();
    }

    // DELETE '/:id'
    if (req.method === 'DELETE' && req.url === `/${id}`) {
      return knex('products').where({ id: id })
        .then((product) => {
          if (product.length < 1) {
            res.status(500);
            return res.json({ "Error": "Couldn't find that product in our database." });
          }
          return next();
        })
        .catch((err) => {
          console.log(err);
          next();
        });
    }
  }
}