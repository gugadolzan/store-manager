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

module.exports = {
  create,
};
