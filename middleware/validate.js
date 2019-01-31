module.exports = {
  validator: function (req, res, next) {

    /************************
     *  ARTICLES
    ************************/
    if (req.originalUrl.slice(0, 9) === '/articles') {
      const title = req.params.title;
      const articleDB = require('../db/articles.js');
      const database = articleDB.getArticles().articles;

      // GET '/:title'
      if (req.method === 'GET' && req.url === `/${title}`) {
        const params = req.params;
        const articleIndex = articleDB.findArticle(params.title);

        if (typeof articleIndex !== 'number') {
          res.status(500);
          return res.json({ "Error": "Couldn't find that product in our database." });
        }
      }

      // GET '/:title/edit'
      if (req.method === 'GET' && req.url === `/${title}/edit`) {
        let params = req.params;
        let articleIndex = articleDB.findArticle(params.title);
        let article = database[articleIndex];

        if (typeof articleIndex !== 'number') {
          return res.render('./articles/new', { message: "That article is not in our database, please add it as a new article" });
        }
      }

      // POST '/articles'
      if (req.method === 'POST' && req.url === '/articles') {
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
      }

      // PUT '/:title'
      if (req.method === "PUT" && req.url === `/${title}`) {
        let body = req.body;
        const params = req.params
        const articleIndex = articleDB.findArticle(params.title);

        if (typeof articleIndex !== 'number') {
          let data = { message: "That article is not in our database, please add it as a new article" };

          return res.render('./articles/new', data);
        }

        for (var key in body) {
          if (body[key].length < 2 || !isNaN(parseInt(body[key]))) {
            return res.render(`./products/edit`, {
              id: params.id,
              title: database[articleIndex].title,
              author: database[articleIndex].price,
              body: database[articleIndex].body,
              message: "Please fill out all fields with approppriate information"
            });
          }
        }
      }

      // DELETE '/:title'
      if (req.method === "DELETE" && req.url === `/${title}`) {
        const articleTitle = req.params.title;
        const articleIndex = articleDB.findArticle(articleTitle);

        if (typeof articleIndex !== 'number') {
          res.status(500);
          return res.json({ "Error": "That product does not exist in our database." })
        }
      }
    }


    /************************
    *  PRODUCTS
    ************************/
    const id = req.params.id;
    const productDB = require('../db/products.js');
    const database = productDB.getProducts().products;

    // GET '/:id'
    if (req.method === 'GET' && req.url === `/${id}`) {
      const params = req.params;
      const productIndex = productDB.findProduct(params.id);

      if (typeof productIndex !== 'number') {
        res.status(500);
        return res.json({ "Error": "Couldn't find that product in our database." });
      }
    }

    // GET '/:id/edit'
    if (req.method === "GET" && req.url === `/${id}/edit`) {
      let params = req.params;
      let productIndex = productDB.findProduct(params.id);
      let product = database[productIndex];

      if (typeof productIndex !== 'number') {
        return res.render('./products/new', { message: "That product is not in our database, please add it as a new product" });
      }
    }

    // POST '/'
    if (req.method === "POST" && req.url === '/products') {
      const body = req.body;

      if (body.length < 3) {
        return res.render('./products/new', { message: "Please fill out all fields with approppriate information" });
      }

      if (!isNaN(parseInt(body.name)) || isNaN(parseInt(body.price)) || isNaN(parseInt(body.inventory))) {
        return res.render('./products/new', { message: "Please provide appropriate information to each field. Name should be a string, Price and Inventory should be numbers." });
      }
    }

    // PUT '/:id'
    if (req.method === "PUT" && req.url === `/${id}`) {
      const body = req.body;
      const params = req.params
      const productIndex = productDB.findProduct(params.id);
      if (typeof productIndex !== 'number') {
        let data = { message: "That product is not in our database, please add it as a new product" };

        return res.render('./products/new', data);
      }

      if (!isNaN(parseInt(body.name)) || isNaN(parseInt(body.price)) || isNaN(parseInt(body.inventory))) {
        return res.render(`./products/edit`, {
          id: params.id,
          name: database[productIndex].name,
          price: database[productIndex].price,
          inventory: database[productIndex].inventory,
          message: "Please provide appropriate information to each field. Name should be a string, Price and Inventory should be numbers."
        });
      }
    }

    // DELETE '/:id'
    if (req.method === 'DELETE' && req.url === `/${id}`) {
      const productID = req.params.id;
      const productIndex = productDB.findProduct(productID);

      if (typeof productIndex !== 'number') {
        res.status(500);
        return res.json({ "Error": "That product does not exist in our database." })
      }
    }

    next();
  }
}