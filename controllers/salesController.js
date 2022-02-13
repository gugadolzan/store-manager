const rescue = require('express-rescue');

const salesService = require('../services/salesService');
const salesSchema = require('../schemas/salesSchema');
const { OK, CREATED } = require('../utils/statusCodes');

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

const getAll = rescue(async (_req, res) => {
  const result = await salesService.getAll();

  res.status(OK).json(result);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;

  const result = await salesService.getById({ id });

  if (result.error) {
    const err = new Error(result.error.message);
    err.code = result.error.code;
    throw err;
  }

  res.status(OK).json(result);
});

const update = rescue(async (req, res) => {
  const { id } = req.params;
  const [sale] = req.body;

  const { error } = salesSchema.validate(serialize(sale));

  if (error) throw error;

  const result = await salesService.update({ id, sale });

  if (result.error) {
    const err = new Error(result.error.message);
    err.code = result.error.code;
    throw err;
  }

  res.status(OK).json(result);
});

module.exports = {
  create,
  getAll,
  getById,
  update,
};
