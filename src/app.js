const express = require('express');
const bodyParser = require('body-parser');

const errorMiddleware = require('./middlewares/error');
const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');

const app = express();

app.use(bodyParser.json());

app.get('/', (_req, res) => res.send());

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.use(errorMiddleware);

module.exports = app;
