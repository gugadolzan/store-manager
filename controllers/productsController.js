const rescue = require('express-rescue');

const productsSchema = require('../schemas/productsSchema');
const productsService = require('../services/productsService');

const create = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;

  const { error } = productsSchema.validate({ name, quantity });

  if (error) return next(error);

  const product = await productsService.create({ name, quantity });

  if (product.error) return next(product.error);

  res.status(201).json(product);
});

const getAll = rescue(async (_req, res) => {
  const products = await productsService.getAll();

  res.status(200).json(products);
});

const getById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const product = await productsService.getById({ id });

  if (product.error) return next(product.error);

  res.status(200).json(product);
});

module.exports = {
  create,
  getAll,
  getById,
};
