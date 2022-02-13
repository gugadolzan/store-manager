const messageByCode = {
  alreadyExists: 'Product already exists',
  notEnoughQuantity: 'Such amount is not permitted to sell',
  productNotFound: 'Product not found',
  saleNotFound: 'Sale not found',
};

module.exports = (code) => {
  const err = new Error(messageByCode[code]);
  err.code = code;
  throw err;
};
