const { UsersService } = require('../../shared/services');
const { catchAsyncFn, passwordUtils, httpResponseErrorUtils } = require('../../shared/utils');

module.exports = {
  handleLogin: catchAsyncFn(async (req, res, next) => {
    const user = await UsersService.getUserByEmail(req.body.email);
    if (!user) {
      throw httpResponseErrorUtils.createNotFound('Email hoặc mật khẩu không chính xác');
    }
    const isMatchPassword = await passwordUtils.isMatch(user.password, req.body.password);
    if (!isMatchPassword) {
      throw httpResponseErrorUtils.createBadRequest('Email hoặc mật khẩu không chính xác');
    }
    delete user._doc['password'];
    return res.status(200).json({
      status: 'OK',
      statusCode: 200,
      responseData: user,
    });
  }),

  handleRegister: catchAsyncFn(async (req, res, next) => {
    const existedUser = await UsersService.getUserByEmail(req.body.email);
    if (existedUser) {
      throw httpResponseErrorUtils.createBadRequest('Email đã tổn tại, vui lòng chọn email khác');
    }
    const encryptedPassword = await passwordUtils.hashPassword(req.body.password);
    const user = await UsersService.createUser({
      email: req.body.email,
      password: encryptedPassword,
      fullName: req.body.fullName,
      phone: req.body.phone,
      gender: req.body.gender,
    });
    ['password', '__v', 'createdAt', 'updatedAt'].forEach((field) => {
      delete user[field];
    });
    return res.status(201).json({
      status: 'Created',
      statusCode: 201,
      responseData: user,
    });
  }),
};
