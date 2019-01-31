const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

describe('Express Server', () => {
  let server;

  describe('/products', () => {
    describe('GET', () => {
      beforeEach(() => {
        delete require.cache[require.resolve('../server')];
        server = require('../server');
      });

      afterEach((done) => {
        server.close(done);
      });

      it('should respond to "/" route', (done) => {
        request(server)
          .get('/products')
          .set('Accept', 'text/html')
          .expect((res) => {
            res.body.length > 0;
          })
          .expect(200, done);
      });

      it('should respond to "/new" route', (done) => {
        request(server)
          .get('/products/new')
          .set('Accept', 'text/html')
          .expect((res) => {
            res.body.length > 0;
          })
          .expect(200, done);
      });

      it('should respond to "/:id" route', (done) => {
        request(server)
          .get('/products/1')
          .set('Accept', 'text/html')
          .expect((res) => {
            res.body.length > 0;
          })
          .expect(200, done);
      });

      it('should throw server error to "/:id" if product with specified id does not exist', (done) => {
        request(server)
          .get('/products/5')
          .set('Accept', 'text/html')
          .expect(500, done);
      });

      it('should respond to "/:id/edit" route', (done) => {
        request(server)
          .get('/products/1/edit')
          .set('Accept', 'text/html')
          .expect((res) => {
            res.body.length > 0;
          })
          .expect(200, done);
      });

      it('should redirect "/:id/edit" to "/new" with a error message if product with specified id does not exist', (done) => {
        request(server)
          .get('/products/2/edit')
          .set('Accept', 'text/html')
          .expect((res) => {
            let html = `<!DOCTYPE html>
            <html lang="en">
            
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>Articles and Products</title>
            </head>
            
            <body>
              <h1>Add New Product</h1>
            <form method="POST" action="/products">
              <label for="name">Name</label>
              <input type="text" name="name" id="name">
              <label for="price">Price</label>
              <input type="text" name="price" id="price" placeholder="$0">
              <label for="inventory">Inventory</label>
              <input type="text" name="inventory" id="inventory" placeholder="0">
              <input type="submit" value="Submit">
            </form>
            <p>That product is not in our database, please add it as a new product</p>
            </body>
            
            </html>`

            res.text === html;
          })
          .expect(200, done);
      });
    });

    describe('POST', () => {
      beforeEach(() => {
        delete require.cache[require.resolve('../server')];
        server = require('../server');
      });

      afterEach((done) => {
        server.close(done);
      });

      it('should respond to "/" route by redirecting to "products"', (done) => {
        request(server)
          .post('/products')
          .send('name=durex&price=20&inventory=100')
          .expect((res) => {
            res.header.location === "/products";
          })
          .expect(302, done);
      });

      it('should redirect to "/new" if not all fields are filled out', (done) => {
        request(server)
          .post('/products')
          .send('name=durex&price=20')
          .expect((res) => {
            let html = `<!DOCTYPE html>
            <html lang="en">
            
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>Articles and Products</title>
            </head>
            
            <body>
              <h1>Add New Product</h1>
            <form method="POST" action="/products">
              <label for="name">Name</label>
              <input type="text" name="name" id="name">
              <label for="price">Price</label>
              <input type="text" name="price" id="price" placeholder="$0">
              <label for="inventory">Inventory</label>
              <input type="text" name="inventory" id="inventory" placeholder="0">
              <input type="submit" value="Submit">
            </form>
            <p>Please provide appropriate information to each field. Name should be a string, Price and Inventory should be numbers.</p>
            </body>
            
            </html>`

            res.text === html;
          })
          .expect(200, done);
      });

      it('should redirect to "/new" if all fields are filled out but has invalid data', (done) => {
        request(server)
          .post('/products')
          .send('name=5&price=five&inventory=one')
          .expect((res) => {
            let html = `<!DOCTYPE html>
            <html lang="en">
            
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>Articles and Products</title>
            </head>
            
            <body>
              <h1>Add New Product</h1>
            <form method="POST" action="/products">
              <label for="name">Name</label>
              <input type="text" name="name" id="name">
              <label for="price">Price</label>
              <input type="text" name="price" id="price" placeholder="$0">
              <label for="inventory">Inventory</label>
              <input type="text" name="inventory" id="inventory" placeholder="0">
              <input type="submit" value="Submit">
            </form>
            <p>Please provide appropriate information to each field. Name should be a string, Price and Inventory should be numbers.</p>
            </body>
            
            </html>`

            res.text === html;
          })
          .expect(200, done);
      });
    });

    describe('PUT', () => {
      beforeEach(() => {
        delete require.cache[require.resolve('../server')];
        server = require('../server');
      });

      afterEach((done) => {
        server.close(done);
      });

      it('should respond to PUT ":/id" with redirect to GET ":/id" ', (done) => {
        request(server)
          .put('/products/1')
          .send('name=durex&price=10&inventory=1')
          .expect((res) => {
            res.text === "Found. Redirecting to ./1"
          })
          .expect(302, done);
      });

      it('should redirect to "/new" if product with specified id does not exist in the database', (done) => {
        request(server)
          .put('/products/4')
          .send('name=durex&price=10&inventory=1')
          .expect((res) => {
            let html = `<!DOCTYPE html>
            <html lang="en">
            
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>Articles and Products</title>
            </head>
            
            <body>
              <h1>Add New Product</h1>
            <form method="POST" action="/products">
              <label for="name">Name</label>
              <input type="text" name="name" id="name">
              <label for="price">Price</label>
              <input type="text" name="price" id="price" placeholder="$0">
              <label for="inventory">Inventory</label>
              <input type="text" name="inventory" id="inventory" placeholder="0">
              <input type="submit" value="Submit">
            </form>
            <p>That product is not in our database, please add it as a new product</p>
            </body>
            
            </html>`

            res.text === html;
          })
          .expect(200, done);
      });

      it('should redirect to "/edit" if invalid data is provided for one of the fields', (done) => {
        request(server)
          .put('/products/1')
          .send('name=4&price=ten&inventory=one')
          .expect((res) => {
            let html = `<!DOCTYPE html>
            <html lang="en">
            
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>Articles and Products</title>
            </head>
            
            <body>
              <h1>Product Editor</h1>
            <form method="POST" action="/products/1?_method=PUT">
              <label for="name">Name</label>
              <input type="text" name="name" id="name" value="durex">
              <label for="price">Price</label>
              <input type="text" name="price" id="price" value="10">
              <label for="inventory">Inventory</label>
              <input name="inventory" id="inventory" value="1">
              <input type="submit" value="Submit">
            </form>
            <p>Please provide appropriate information to each field. Name should be a string, Price and Inventory should be numbers.</p>
            </body>
            
            </html>`

            res.text === html;
          })
          .expect(200, done);
      });
    });

    describe('DELETE', () => {
      beforeEach(() => {
        delete require.cache[require.resolve('../server')];
        server = require('../server');
      });

      afterEach((done) => {
        server.close(done);
      });

      it('should redirect to "/" upon successful deletion', (done) => {
        request(server)
          .delete('/products/1')
          .expect((res) => {
            let html = `<!DOCTYPE html>
            <html lang="en">
            
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>Articles and Products</title>
            </head>
            
            <body>
              <h1>Products</h1>
            <p>Deletion Successful</p>
            <h2>durex</h2>
            <h3>$20</h3>
            <p>100 left in stock</p>
            </br>
            
            </body>
            
            </html>`

            res.text === html;
          })
          .expect(200, done);
      });

      it('should throw a server error if product with specified id does not exist', (done) => {
        request(server)
          .delete('/products/4')
          .expect(500, done);
      });
    });
  });

  describe('/articles', () => {
    describe('GET', () => {
      beforeEach(() => {
        delete require.cache[require.resolve('../server')];
        server = require('../server');
      });

      afterEach((done) => {
        server.close(done);
      });

      it('should respond to "/" route', (done) => {
        request(server)
          .get('/articles')
          .set('Accept', 'text/html')
          .expect((res) => {
            res.body.length > 0;
          })
          .expect(200, done);
      });

      it('should respond to "/new" route', (done) => {
        request(server)
          .get('/articles/new')
          .set('Accept', 'text/html')
          .expect((res) => {
            res.body.length > 0;
          })
          .expect(200, done);
      });

      it('should respond to "/:title" route', (done) => {
        request(server)
          .get('/articles/myswedish-madepenisenlargerandme')
          .set('Accept', 'text/html')
          .expect((res) => {
            res.body.length > 0;
          })
          .expect(200, done);
      });

      it('should throw server error to "/:title" if product with specified title does not exist', (done) => {
        request(server)
          .get('/articles/shakespeare')
          .set('Accept', 'text/html')
          .expect(500, done);
      });

      it('should respond to "/:title/edit" route', (done) => {
        request(server)
          .get('/articles/myswedish-madepenisenlargerandme/edit')
          .set('Accept', 'text/html')
          .expect((res) => {
            res.body.length > 0;
          })
          .expect(200, done);
      });

      it('should redirect "/:title/edit" to "/new" with an error message if article with specified title does not exist', (done) => {
        request(server)
          .get('/articles/shakespeare/edit')
          .set('Accept', 'text/html')
          .expect((res) => {
            let html = `<!DOCTYPE html>
            <html lang="en">
            
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>Articles and Products</title>
            </head>
            
            <body>
              <h1>Add New Article</h1>
            <form method="POST" action="/articles">
              <label for="title">Title</label>
              </br>
              <input type="text" name="title" id="title">
              </br>
              <label for="author">Author</label>
              </br>
              <input type="text" name="author" id="author">
              </br>
              <label for="body">Body</label>
              </br>
              <input name="body" id="body">
              </br>
              <input type="submit" value="Submit">
            </form>
            <p>That article is not in our database, please add it as a new article</p>
            </body>
            
            </html>`;

            res.text === html;
          })
          .expect(200, done);
      });
    });

    describe('POST', () => {
      beforeEach(() => {
        delete require.cache[require.resolve('../server')];
        server = require('../server');
      });

      afterEach((done) => {
        server.close(done);
      });

      it('should respond to "/" route by redirecting to "/articles" after successfully adding article', (done) => {
        request(server)
          .post('/articles')
          .send('title=hamlet&author=shakespeare&body=tobeornottobe')
          .expect((res) => {
            res.header.location === "/articles";
          })
          .expect(302, done);
      });

      it('should redirect to "/new" if not all fields are filled out', (done) => {
        request(server)
          .post('/articles')
          .send('title=hamlet&author=shakespeare')
          .expect((res) => {
            let html = `<!DOCTYPE html>
            <html lang="en">
            
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>Articles and Products</title>
            </head>
            
            <body>
              <h1>Add New Product</h1>
            <form method="POST" action="/products">
              <label for="name">Name</label>
              <input type="text" name="name" id="name">
              <label for="price">Price</label>
              <input type="text" name="price" id="price" placeholder="$0">
              <label for="inventory">Inventory</label>
              <input type="text" name="inventory" id="inventory" placeholder="0">
              <input type="submit" value="Submit">
            </form>
            <p>Please fill out all fields with approppriate information</p>
            </body>
            
            </html>`;

            res.text === html;
          })
          .expect(200, done);
      });

      it('should redirect to "/new" if all fields are filled out but has invalid data', (done) => {
        request(server)
          .post('/articles')
          .send('title=5&author=five&body=1')
          .expect((res) => {
            let html = `<!DOCTYPE html>
            <html lang="en">
            
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>Articles and Products</title>
            </head>
            
            <body>
              <h1>Add New Product</h1>
            <form method="POST" action="/products">
              <label for="name">Name</label>
              <input type="text" name="name" id="name">
              <label for="price">Price</label>
              <input type="text" name="price" id="price" placeholder="$0">
              <label for="inventory">Inventory</label>
              <input type="text" name="inventory" id="inventory" placeholder="0">
              <input type="submit" value="Submit">
            </form>
            <p>Please fill out all fields with approppriate information</p>
            </body>
            
            </html>`;

            res.text === html;
          })
          .expect(200, done);
      });
    });

    describe('PUT', () => {
      beforeEach(() => {
        delete require.cache[require.resolve('../server')];
        server = require('../server');
      });

      afterEach((done) => {
        server.close(done);
      });

      it('should respond to PUT ":/title" with redirect to GET ":/title" ', (done) => {
        request(server)
          .put('/articles/myswedish-madepenisenlargerandme')
          .send('title=myswedish-madepenisenlargerandme&author=shakespeare&body=tobeornottobe')
          .expect((res) => {
            res.text === "Found. Redirecting to ./myswedish-madepenisenlargerandme"
          })
          .expect(302, done);
      });

      it('should redirect to "/new" if article with specified title does not exist in the database', (done) => {
        request(server)
          .put('/articles/holes')
          .send('title=durex&author=10&body=1')
          .expect((res) => {
            let html = `<!DOCTYPE html>
            <html lang="en">
            
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>Articles and Products</title>
            </head>
            
            <body>
              <h1>Add New Article</h1>
            <form method="POST" action="/articles">
              <label for="title">Title</label>
              </br>
              <input type="text" name="title" id="title">
              </br>
              <label for="author">Author</label>
              </br>
              <input type="text" name="author" id="author">
              </br>
              <label for="body">Body</label>
              </br>
              <input name="body" id="body">
              </br>
              <input type="submit" value="Submit">
            </form>
            <p>That article is not in our database, please add it as a new article</p>
            </body>
            
            </html>`;

            res.text === html;
          })
          .expect(200, done);
      });

      it('should redirect to "/edit" if invalid data is provided for one of the fields', (done) => {
        request(server)
          .put('/articles/myswedish-madepenisenlargerandme')
          .send('title=4&author=5&body=6')
          .expect((res) => {
            let html = `<!DOCTYPE html>
            <html lang="en">
            
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>Articles and Products</title>
            </head>
            
            <body>
              <h1>Product Editor</h1>
            <form method="POST" action="/products/?_method=PUT">
              <label for="name">Name</label>
              <input type="text" name="name" id="name" value="">
              <label for="price">Price</label>
              <input type="text" name="price" id="price" value="">
              <label for="inventory">Inventory</label>
              <input name="inventory" id="inventory" value="">
              <input type="submit" value="Submit">
            </form>
            <p>Please fill out all fields with approppriate information</p>
            </body>
            
            </html>`;

            res.text === html;
          })
          .expect(200, done);
      });
    });

    describe('DELETE', () => {
      beforeEach(() => {
        delete require.cache[require.resolve('../server')];
        server = require('../server');
      });

      afterEach((done) => {
        server.close(done);
      });

      it('should redirect to "/" upon successful deletion', (done) => {
        request(server)
          .delete('/articles/myswedish-madepenisenlargerandme')
          .expect((res) => {
            let html = `<!DOCTYPE html>
            <html lang="en">
            
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>Articles and Products</title>
            </head>
            
            <body>
              <h1>Articles</h1>
            <p>Deletion Successful</p>
            <h2>hamlet</h2>
            <h3>by: tobeornottobe</h3>
            <p>shakespeare</p>
            </br>
            
            </body>
            
            </html>`;

            res.text === html;
          })
          .expect(200, done);
      });

      it('should throw a server error if product with specified id does not exist', (done) => {
        request(server)
          .delete('/articles/holes')
          .expect(500, done);
      });
    });
  });
});