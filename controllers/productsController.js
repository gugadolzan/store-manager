const rescue = require('express-rescue');

const productsSchema = require('../schemas/productsSchema');
const productsService = require('../services/productsService');

const generateError = require('../utils/generateError');
const { HTTP_STATUS_CODES } = require('../utils/statusCodes');

const create = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;

  const { error } = productsSchema.validate({ name, quantity });

  if (error) return next(error);

  const product = await productsService.create({ name, quantity });

  if (product.error) return generateError(product.error, next);

  res.status(HTTP_STATUS_CODES.CREATED).json(product);
});

const getAll = rescue(async (_req, res) => {
  const products = await productsService.getAll();

  res.status(HTTP_STATUS_CODES.OK).json(products);
});

const getById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const product = await productsService.getById({ id });

  if (product.error) return generateError(product.error, next);

  res.status(HTTP_STATUS_CODES.OK).json(product);
});

module.exports = {
  create,
  getAll,
  getById,
};
