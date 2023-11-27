const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const { httpResponseErrorUtils } = require('../utils');

const verifyTokenMiddleware = (isAdmin = false) => {
  return expressjwt({
    secret: process.env.TOKEN_SECRET || 'token_secret',
    algorithms: ['HS256'],
    getToken: (req) => req.headers.authorization.split(' ')[1],
    requestProperty: 'currentUser',
  }).unless({ path: [] })((err, req, res, next) => {
    if (err instanceof jwt.JsonWebTokenError) {
      return next(httpResponseErrorUtils.createUnauthorized('Token không hợp lệ'));
    }
    if (err instanceof jwt.TokenExpiredError) {
      return next(httpResponseErrorUtils.createUnauthorized('Token đã hết hạn'));
    }
    if (isAdmin && !req.currentUser.isAdmin) {
      return next(
        httpResponseErrorUtils.createForbidden('Bạn không có quyền truy cập vào chức năng này'),
      );
    }
    return next();
  });
};

module.exports = verifyTokenMiddleware;
