const rescue = require('express-rescue');

const productsSchema = require('../schemas/productsSchema');
const productsService = require('../services/productsService');
const { OK, CREATED } = require('../helpers/statusCodes');

const create = rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const { error } = productsSchema.validate({ name, quantity });

  if (error) throw error;

  const product = await productsService.create({ name, quantity });

  res.status(CREATED).json(product);
});

const getAll = rescue(async (_req, res) => {
  const products = await productsService.getAll();

  res.status(OK).json(products);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;

  const product = await productsService.getById({ id });

  res.status(OK).json(product);
});

const update = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const { error } = productsSchema.validate({ name, quantity });

  if (error) throw error;

  const product = await productsService.update({ id, name, quantity });

  res.status(OK).json(product);
});

const remove = rescue(async (req, res) => {
  const { id } = req.params;

  const product = await productsService.remove({ id });

  res.status(OK).json(product);
});

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
