const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const morgan     = require('morgan');

const app = express();

const productsRouter = require('./routes/products-router');
const cartRouter     = require('./routes/cart-router');

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/products', productsRouter);
app.use('/cart', cartRouter);

module.exports = app;