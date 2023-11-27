const { UsersService } = require('../../shared/services');
const userTokensService = require('../../shared/services/user-tokens.service');
const {
  catchAsyncFn,
  passwordUtils,
  httpResponseErrorUtils,
  tokenUtils,
} = require('../../shared/utils');

module.exports = {
  handleLogin: catchAsyncFn(async (req, res, next) => {}),

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

    const payload = {
      userId: user._id,
      isAdmin: user.isAdmin,
    };
    const accessToken = tokenUtils.generateAccessToken(payload);
    const refreshToken = tokenUtils.generateRefreshToken(payload);
    await userTokensService.saveToken(user._id, refreshToken);

    return res.status(201).json({
      status: 'Created',
      statusCode: 201,
      responseData: {
        ...user,
        accessToken,
      },
    });
  }),
};
