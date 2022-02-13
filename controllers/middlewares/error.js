const {
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR,
} = require('../../helpers/statusCodes');

const byErrorCode = {
  alreadyExists: CONFLICT,
  notEnoughQuantity: UNPROCESSABLE_ENTITY,
  productNotFound: NOT_FOUND,
  saleNotFound: NOT_FOUND,
};

const byErrorType = {
  'any.required': BAD_REQUEST,
};

// Exporting array of middlewares, which will be executed in order
module.exports = [
  /**
   * Middleware for handling Joi errors
   */
  (err, _req, res, next) => {
    if (!err.isJoi) return next(err);

    const status = byErrorType[err.details[0].type] || UNPROCESSABLE_ENTITY;
    const { message } = err.details[0];

    res.status(status).json({ message });
  },
  /**
   * Middleware for handling other errors
   */
  (err, _req, res, _next) => {
    const status = byErrorCode[err.code] || INTERNAL_SERVER_ERROR;
    const message = err.message || 'Internal server error';

    if (status === 500) console.error(err);

    res.status(status).json({ message });
  },
];
