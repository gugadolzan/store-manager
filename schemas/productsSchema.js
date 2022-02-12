const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required().messages({
    'number.base': '"quantity" must be a number larger than or equal to 1',
    'number.min': '"quantity" must be a number larger than or equal to 1',
  }),
});
