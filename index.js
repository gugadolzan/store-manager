require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const errorMiddleware = require('./controllers/middlewares/error');
const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');

const app = express();

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
