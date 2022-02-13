const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const create = async (sales) => {
  const products = await Promise.all(
    sales.map(async (sale) => {
      const product = await productsModel.getById({ id: sale.product_id });
      return product;
    }),
  );

  // Check if any of the products are not found
  if (products.some((product) => !product)) {
    return { error: { code: 'notFound', message: 'Product not found' } };
  }

  const result = await salesModel.create(sales);

  return result;
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

module.exports = {
  create,
  getAll,
  getById,
  update,
};
