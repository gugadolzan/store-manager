require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  // console.log(`Escutando na porta ${process.env.PORT}`);
  console.log(`Server is running on port ${process.env.PORT}`);
});
