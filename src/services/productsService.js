const throwNewError = require('../helpers/throwNewError');
const productsModel = require('../models/productsModel');

const create = async ({ name, quantity }) => {
  let product = await productsModel.getByName({ name });

  if (product) throwNewError('alreadyExists');

  product = await productsModel.create({ name, quantity });

  return product;
};

const getAll = async () => {
  const products = await productsModel.getAll();

  return products;
};

const getById = async ({ id }) => {
  const product = await productsModel.getById({ id });

  if (!product) throwNewError('productNotFound');

  return product;
};

const update = async ({ id, name, quantity }) => {
  const product = await productsModel.getById({ id });

  if (!product) throwNewError('productNotFound');

  await productsModel.update({ id, name, quantity });

  return { id, name, quantity };
};

const remove = async ({ id }) => {
  const product = await productsModel.getById({ id });

  if (!product) throwNewError('productNotFound');

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
