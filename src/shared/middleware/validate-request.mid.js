const { httpResponseErrorUtils } = require('../utils');

/**
 * @param {'body' | 'params' | 'query'} container
 * @param {any} schema
 * @returns {any}
 */
const validateRequestMiddleware = (container, schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[container]);
    if (error) {
      const validationErrors = error.details.map((error) => error.message);
      return next(httpResponseErrorUtils.createBadRequest(validationErrors[0] || 'Bad request'));
    }
    return next();
  };
};

module.exports = validateRequestMiddleware;
