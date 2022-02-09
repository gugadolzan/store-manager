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

module.exports = {
  create,
};
