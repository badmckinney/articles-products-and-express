const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const productDB = require('./db/products');
const articleDB = require('./db/articles');
router = express.Router();

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main.hbs'
}));
app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/products', productDB);
app.use('/articles', articleDB);


const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
