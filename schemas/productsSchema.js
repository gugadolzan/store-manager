const Joi = require('joi');

const ERROR_MESSAGE = '"quantity" must be a number larger than or equal to 1';

module.exports = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required().messages({
    'number.base': ERROR_MESSAGE,
    'number.min': ERROR_MESSAGE,
  }),
});
