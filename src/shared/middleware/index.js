module.exports = {
  validateRequestMiddleware: require('./validate-request.mid'),
  handleErrorRequestMiddleware: require('./handle-error-request.mid'),
  verifyTokenMiddleware: require('./verify-token.mid'),
  parseJsonStr2ObjMiddleware: require('./parse-json-str-2-obj.mid'),
};
