const {
  HTTP_STATUS_CODES,
  STATUS_BY_ERROR_CODE,
  STATUS_BY_ERROR_TYPE,
} = require('../../utils/statusCodes');

// Exporting array of middlewares, which will be executed in order
module.exports = [
  (err, _req, res, next) => {
    if (!err.isJoi) return next(err);

    const status = STATUS_BY_ERROR_TYPE[err.details[0].type]
      || HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY;
    const { message } = err.details[0];

    res.status(status).json({ message });
  },
  (err, _req, res, _next) => {
    const status = STATUS_BY_ERROR_CODE[err.code] || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Internal server error';

    if (status === 500) console.error(err);

    res.status(status).json({ message });
  },
];
