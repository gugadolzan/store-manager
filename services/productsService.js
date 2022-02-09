const productsModel = require('../models/productsModel');

const create = async ({ name, quantity }) => {
  let product = await productsModel.getByName({ name });

  if (product) return { error: { message: 'Product already exists' } };

  product = await productsModel.create({ name, quantity });

  return product;
};

module.exports = {
  create,
};
