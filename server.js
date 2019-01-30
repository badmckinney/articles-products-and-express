const fs = require('fs');
const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const validator = require('./middleware/validate');
const productDB = require('./routes/products');
const articleDB = require('./routes/articles');
router = express.Router();

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main.hbs'
}));
app.set('views', __dirname + '/views/templates');
app.set('view engine', '.hbs');
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  let now = new Date().toDateString();
  now = now.replace(/ /g, "_");
  console.log(now);
  fs.appendFile(`./logs/${now}.log`, "\n" + `${req.method} ${req.url} ${new Date().toUTCString()}`, 'utf8', (err) => {
    if (err) {
      return console.log(err);
    }
    return console.log('logged');
  });
  next();
});

app.use(validator.validator);
app.use('/products', productDB);
app.use('/articles', articleDB);


const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
