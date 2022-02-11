const rescue = require('express-rescue');

const productsSchema = require('../../schemas/productsSchema');

/**
 * Validates the product data
 */
module.exports = rescue((req, _res, next) => {
  const { name, quantity } = req.body;

  const { error } = productsSchema.validate({ name, quantity });

  if (error) throw error;

  next();
});
