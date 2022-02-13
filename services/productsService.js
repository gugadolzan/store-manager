const productsModel = require('../models/productsModel');

const create = async ({ name, quantity }) => {
  let product = await productsModel.getByName({ name });

  if (product) {
    return {
      error: { code: 'alreadyExists', message: 'Product already exists' },
    };
  }

  product = await productsModel.create({ name, quantity });

  return product;
};

const getAll = async () => {
  const products = await productsModel.getAll();

  return products;
};

const getById = async ({ id }) => {
  const product = await productsModel.getById({ id });

  if (!product) {
    return { error: { code: 'notFound', message: 'Product not found' } };
  }

  return product;
};

const update = async ({ id, name, quantity }) => {
  const product = await productsModel.getById({ id });

  if (!product) {
    return { error: { code: 'notFound', message: 'Product not found' } };
  }

  await productsModel.update({ id, name, quantity });

  return { id, name, quantity };
};

const remove = async ({ id }) => {
  const product = await productsModel.getById({ id });

  if (!product) {
    return { error: { code: 'notFound', message: 'Product not found' } };
  }

  await productsModel.remove({ id });

  return product;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
