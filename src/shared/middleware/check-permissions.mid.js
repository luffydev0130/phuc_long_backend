const { RolesEnum } = require('../enums');
const { httpResponseErrorUtils } = require('../utils');

const checkPermissionsMiddleware = (roles) => {
  return (req, res, next) => {
    const forbiddenError = httpResponseErrorUtils.createForbidden(
      'Tài khoản không được phép thực hiện thao tác này',
    );
    if (!req.currentUser || !roles.length) {
      return next(forbiddenError);
    }
    for (let role of roles) {
      switch (role) {
        case RolesEnum.Admin: {
          if (!req.currentUser.isAdmin) {
            return next(forbiddenError);
          }
        }
        case RolesEnum.Owner: {
          if (req.currentUser._id !== req.params.userId) {
            return next(forbiddenError);
          }
        }
        default: {
          return next(`Không thể thực hiện thao tác hiện với với vai trò: ${role}`);
        }
      }
    }
    return next();
  };
};

module.exports = checkPermissionsMiddleware;
