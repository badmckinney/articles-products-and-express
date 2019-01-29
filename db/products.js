(function () {
  const products = {
    "products": []
  };

  const getProducts = () => {
    return articles.articles;
  };

  const addProduct = (name, price, inventory) => {
    let product = {};

    product.id = products.products.length;
    product.name = name;
    product.price = price;
    product.inventory = parseInt(inventory);

    products.products.push(product);
  };

  const findProduct = (id) => {
    let index = -1;

    products.products.forEach(product => {
      if (product.id === id) {
        return index = products.products.indexOf(product);
      }
    });

    if (index < 0) {
      return false;
    }
    return products.products[index];
  };

  const editProduct = (data) => {
    let product = findProduct(data.id);

    if (!product) {
      return false;
    }

    for (var key in product) {
      product[key] = data.key;
    }

    return true;
  };

  const removeProduct = (id) => {
    let product = findProduct(id);

    if (!product) {
      return false;
    }

    products.products.splice(products.products.indexOf(product), 1);
    return true;
  };

  module.exports = {
    getProducts,
    addProduct,
    findProduct,
    editProduct,
    removeProduct
  };


})();