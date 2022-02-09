const STATUS_BY_ERROR_TYPE = {
  'any.required': 400,
};

const STATUS_BY_ERROR_CODE = {
  alreadyExists: 409,
};

// Exporting array of middlewares, which will be executed in order
module.exports = [
  (err, _req, res, next) => {
    if (!err.isJoi) return next(err);

    const status = STATUS_BY_ERROR_TYPE[err.details[0].type] || 422;
    const { message } = err.details[0];

    res.status(status).json({ message });
  },
  (err, _req, res, _next) => {
    const status = STATUS_BY_ERROR_CODE[err.code] || 500;
    const message = err.message || 'Internal server error';

    if (status === 500) console.error(err);

    res.status(status).json({ message });
  },
];
