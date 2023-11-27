module.exports = {
  /**
   * Create a bad request error
   * @param {string} msg
   * @returns {Error}
   */
  createBadRequest: (msg) => {
    const error = new Error(msg);
    error.status = 'Bad Request';
    error.statusCode = 400;
    return error;
  },

  /**
   * Create a unauthorize error
   * @param {string} msg
   * @returns {Error}
   */
  createUnauthorized: (msg) => {
    const error = new Error(msg);
    error.status = 'Unauthorized';
    error.statusCode = 401;
    return error;
  },

  /**
   * Create a forbidden error
   * @param {string} msg
   * @returns {Error}
   */
  createForbidden: (msg) => {
    const error = new Error(msg);
    error.status = 'Forbidden';
    error.statusCode = 403;
    return error;
  },

  /**
   * Create a not found error
   * @param {string} msg
   * @returns {Error}
   */
  createNotFound: (msg) => {
    const error = new Error(msg);
    error.status = 'Not found';
    error.statusCode = 404;
    return error;
  },
};
