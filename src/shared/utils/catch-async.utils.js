/**
 * Wrap an async function and catch error then forward to the Express Error Handler
 * @param {Function} fn
 * @returns {Function}
 */
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = catchAsync;
