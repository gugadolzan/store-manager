const {
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR,
} = require('../../utils/statusCodes');

const BY_ERROR_CODE = {
  alreadyExists: CONFLICT,
  notFound: NOT_FOUND,
};

const BY_ERROR_TYPE = {
  'any.required': BAD_REQUEST,
};

// Exporting array of middlewares, which will be executed in order
module.exports = [
  /**
   * Middleware for handling Joi errors
   */
  (err, _req, res, next) => {
    if (!err.isJoi) return next(err);

    const status = BY_ERROR_TYPE[err.details[0].type] || UNPROCESSABLE_ENTITY;
    const { message } = err.details[0];

    res.status(status).json({ message });
  },
  /**
   * Middleware for handling other errors
   */
  (err, _req, res, _next) => {
    const status = BY_ERROR_CODE[err.code] || INTERNAL_SERVER_ERROR;
    const message = err.message || 'Internal server error';

    if (status === 500) console.error(err);

    res.status(status).json({ message });
  },
];
