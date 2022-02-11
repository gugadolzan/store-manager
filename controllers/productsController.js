const rescue = require('express-rescue');

const validateProduct = require('./middlewares/validateProduct');
const productsService = require('../services/productsService');

const { HTTP_STATUS_CODES } = require('../utils/statusCodes');

const create = [
  validateProduct,
  rescue(async (req, res) => {
    const { name, quantity } = req.body;

    const product = await productsService.create({ name, quantity });

    if (product.error) {
      const err = new Error(product.error.message);
      err.code = product.error.code;
      throw err;
    }

    res.status(HTTP_STATUS_CODES.CREATED).json(product);
  }),
];

const getAll = rescue(async (_req, res) => {
  const products = await productsService.getAll();

  res.status(HTTP_STATUS_CODES.OK).json(products);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;

  const product = await productsService.getById({ id });

  if (product.error) {
    const err = new Error(product.error.message);
    err.code = product.error.code;
    throw err;
  }

  res.status(HTTP_STATUS_CODES.OK).json(product);
});

const update = [
  validateProduct,
  rescue(async (req, res) => {
    const { name, quantity } = req.body;
    const { id } = req.params;

    const product = await productsService.update({ id, name, quantity });

    if (product.error) {
      const err = new Error(product.error.message);
      err.code = product.error.code;
      throw err;
    }

    res.status(HTTP_STATUS_CODES.OK).json(product);
  }),
];

module.exports = {
  create,
  getAll,
  getById,
  update,
};
