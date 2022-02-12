const rescue = require('express-rescue');

const salesService = require('../services/salesService');
const salesSchema = require('../schemas/salesSchema');
const { CREATED } = require('../utils/statusCodes');

const serialize = (sale) => ({
  productId: sale.product_id,
  quantity: sale.quantity,
});

const create = rescue(async (req, res) => {
  const sales = req.body;

  // Check if any of the products are invalid
  sales.forEach((sale) => {
    const { error } = salesSchema.validate(serialize(sale));
    if (error) throw error;
  });

  const result = await salesService.create(sales);

  if (result.error) {
    const err = new Error(result.error.message);
    err.code = result.error.code;
    throw err;
  }

  res.status(CREATED).json(result);
});

module.exports = {
  create,
};
