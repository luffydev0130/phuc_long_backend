require('dotenv').config();

const handleErrorRequestMiddleware = (err, req, res, next) => {
  const status = err.status || 'Internal error error';
  const statusCode = Number(err.statusCode) || 500;
  const message = err.message || 'Internal server error. An error occurred in request progress';
  let tracing = undefined;
  if (process.env.NODE_ENV !== 'production' && statusCode === 500) {
    tracing = err.stack;
  }
  return res.status(statusCode).json({
    status,
    statusCode,
    message,
    tracing,
  });
};

module.exports = handleErrorRequestMiddleware;
