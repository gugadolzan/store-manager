const Joi = require('joi');

module.exports = Joi.object({
  productId: Joi.number().min(1).required().messages({
    'number.base': '"product_id" must be a number larger than or equal to 1',
    'number.min': '"product_id" must be a number larger than or equal to 1',
    'any.required': '"product_id" is required',
  }),
  quantity: Joi.number().min(1).required().messages({
    'number.base': '"quantity" must be a number larger than or equal to 1',
    'number.min': '"quantity" must be a number larger than or equal to 1',
  }),
});
