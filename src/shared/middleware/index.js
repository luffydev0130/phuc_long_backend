module.exports = {
  verifyTokenMiddleware: require('./verify-token.mid'),
  validateRequestMiddleware: require('./validate-request.mid'),
  checkPermissionsMiddleware: require('./check-permissions.mid'),
  parseJsonStr2ObjMiddleware: require('./parse-json-str-2-obj.mid'),
  handleErrorRequestMiddleware: require('./handle-error-request.mid'),
};
