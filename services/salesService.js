const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const create = async (sales) => {
  await Promise.all(
    sales.map(async (sale) => {
      const product = await productsModel.getById({ id: sale.product_id });

      // Check if the product exists
      if (!product) {
        const err = new Error('Product not found');
        err.code = 'notFound';
        throw err;
      }

      const newQuantity = product.quantity - sale.quantity;

      if (newQuantity <= 0) {
        const err = new Error('Such amount is not permitted to sell');
        err.code = 'notEnoughQuantity';
        throw err;
      }

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

  if (result.length === 0) {
    return { error: { code: 'notFound', message: 'Sale not found' } };
  }

  return result;
};

const update = async ({ id, sale }) => {
  const { error } = await getById({ id });

  if (error) return { error };

  await salesModel.update({ id, sale });

  return { saleId: id, itemUpdated: [{ ...sale }] };
};

const remove = async ({ id }) => {
  const result = await getById({ id });

  if (result.error) return result;

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
