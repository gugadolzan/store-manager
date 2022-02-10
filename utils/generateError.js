module.exports = (error, next) => {
  const err = new Error(error.message);
  err.code = error.code;
  return next(err);
};
