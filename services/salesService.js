const throwNewError = require('../helpers/throwNewError');
const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const create = async (sales) => {
  await Promise.all(
    sales.map(async (sale) => {
      const product = await productsModel.getById({ id: sale.product_id });

      // Check if the product exists
      if (!product) throwNewError('productNotFound');

      const newQuantity = product.quantity - sale.quantity;

      if (newQuantity <= 0) throwNewError('notEnoughQuantity');

      // Update the quantity of the product
      await productsModel.update({ ...product, quantity: newQuantity });
    }),
  );

  return salesModel.create(sales);
};

const getAll = async () => {
  const result = await salesModel.getAll();

  return result;
};

const getById = async ({ id }) => {
  const result = await salesModel.getById({ id });

  if (result.length === 0) throwNewError('saleNotFound');

  return result;
};

const update = async ({ id, sale }) => {
  await getById({ id });

  await salesModel.update({ id, sale });

  return { saleId: id, itemUpdated: [{ ...sale }] };
};

const remove = async ({ id }) => {
  const result = await getById({ id });

  // Restore quantity of each product in the database
  await Promise.all(
    result.map(async (sale) => {
      const product = await productsModel.getById({ id: sale.product_id });

      const newQuantity = product.quantity + sale.quantity;

      await productsModel.update({ ...product, quantity: newQuantity });
    }),
  );

  await salesModel.remove({ id });

  return result;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
