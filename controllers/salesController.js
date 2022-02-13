const rescue = require('express-rescue');

const salesSchema = require('../schemas/salesSchema');
const salesService = require('../services/salesService');
const { OK, CREATED } = require('../helpers/statusCodes');

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

  res.status(CREATED).json(result);
});

const getAll = rescue(async (_req, res) => {
  const result = await salesService.getAll();

  res.status(OK).json(result);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;

  const result = await salesService.getById({ id });

  res.status(OK).json(result);
});

const update = rescue(async (req, res) => {
  const { id } = req.params;
  const [sale] = req.body;

  const { error } = salesSchema.validate(serialize(sale));

  if (error) throw error;

  const result = await salesService.update({ id, sale });

  res.status(OK).json(result);
});

const remove = rescue(async (req, res) => {
  const { id } = req.params;

  const result = await salesService.remove({ id });

  res.status(OK).json(result);
});

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
