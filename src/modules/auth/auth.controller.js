const { UsersService } = require('../../shared/services');
const {
  catchAsyncFn,
  passwordUtils,
  httpResponseErrorUtils,
  tokenUtils,
} = require('../../shared/utils');

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
    if (user.isBlock) {
      throw httpResponseErrorUtils.createForbidden(
        'Tài khoản của bạn đã bị tạm khoá, vui lòng liên hệ admin để được hỗ trợ',
      );
    }
    delete user._doc['password'];
    const accessToken = tokenUtils.generateAccessToken({
      _id: user._id,
      isAdmin: user.isAdmin,
    });
    return res.status(200).json({
      status: 'OK',
      statusCode: 200,
      responseData: {
        ...user._doc,
        accessToken,
      },
    });
  }),

  handleRegister: catchAsyncFn(async (req, res, next) => {
    const [existedEmail, existedPhone] = await Promise.all([
      UsersService.getUserByEmail(req.body.email),
      UsersService.getUserByPhone(req.body.phone),
    ]);
    if (existedEmail) {
      throw httpResponseErrorUtils.createBadRequest('Email đã tổn tại, vui lòng chọn email khác');
    }
    if (existedPhone) {
      throw httpResponseErrorUtils.createBadRequest(
        'Số điện thoại đã được sử dụng, vui lòng nhập số điện thoại khác',
      );
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
      delete user._doc[field];
    });
    const accessToken = tokenUtils.generateAccessToken({
      _id: user._id,
      isAdmin: user.isAdmin,
    });
    return res.status(201).json({
      status: 'Created',
      statusCode: 201,
      responseData: {
        ...user._doc,
        accessToken,
      },
    });
  }),
};
