const rescue = require('express-rescue');

const productsSchema = require('../schemas/productsSchema');
const productsService = require('../services/productsService');
const { OK, CREATED } = require('../utils/statusCodes');

const create = rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const { error } = productsSchema.validate({ name, quantity });

  if (error) throw error;

  const product = await productsService.create({ name, quantity });

  if (product.error) {
    const err = new Error(product.error.message);
    err.code = product.error.code;
    throw err;
  }

  res.status(CREATED).json(product);
});

const getAll = rescue(async (_req, res) => {
  const products = await productsService.getAll();

  res.status(OK).json(products);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;

  const product = await productsService.getById({ id });

  if (product.error) {
    const err = new Error(product.error.message);
    err.code = product.error.code;
    throw err;
  }

  res.status(OK).json(product);
});

const update = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const { error } = productsSchema.validate({ name, quantity });

  if (error) throw error;

  const product = await productsService.update({ id, name, quantity });

  if (product.error) {
    const err = new Error(product.error.message);
    err.code = product.error.code;
    throw err;
  }

  res.status(OK).json(product);
});

const remove = rescue(async (req, res) => {
  const { id } = req.params;

  const product = await productsService.remove({ id });

  if (product.error) {
    const err = new Error(product.error.message);
    err.code = product.error.code;
    throw err;
  }

  res.status(OK).json(product);
});

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
