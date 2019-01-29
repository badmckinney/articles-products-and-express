const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
router = express.Router();

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main.hbs'
}));
app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({ extended: false }));


const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
