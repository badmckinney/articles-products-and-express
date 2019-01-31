(function () {
  const products = {
    "products": [
      {
        name: "Sham Wow",
        price: 40,
        inventory: 1000,
        id: 1
      }
    ]
  };

  const getProducts = () => {
    return products;
  };

  const addProduct = (name, price, inventory) => {
    if (!isNaN(parseInt(name)) || isNaN(parseInt(price)) || isNaN(parseInt(inventory))) {
      return false;
    }
    let product = {};

    product.id = products.products.length + 1;
    product.name = name;
    product.price = parseInt(price);
    product.inventory = parseInt(inventory);

    products.products.push(product);

    return true;
  };

  const findProduct = (id) => {
    let index = -1;

    products.products.forEach(product => {
      if (product.id === parseInt(id)) {
        return index = products.products.indexOf(product);
      }
    });

    if (index < 0) {
      return false;
    }
    return index;
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
    let counter = 0;
    products.forEach(product => {
      counter += 1;
      product.id = counter;
    });

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