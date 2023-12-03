const path = require('path');
const {
  tokenUtils,
  catchAsyncFn,
  passwordUtils,
  sendMailUtils,
  generateOtpUtils,
  parseTemplateUtils,
  httpResponseErrorUtils,
} = require('../../shared/utils');
const { UsersService, CartsService, UserOtpsService } = require('../../shared/services');

const SUBJECT = 'LaKong - Coffee & Teas - Khôi phục mật khẩu';
const FILE_PATH = path.resolve(
  __dirname,
  '../',
  '../',
  'shared',
  'templates',
  'forgot-password.tpl.html',
);

module.exports = {
  handleLogin: catchAsyncFn(async (req, res, next) => {
    // Check existed user
    const user = await UsersService.getUserByEmail(req.body.email);
    if (!user) {
      throw httpResponseErrorUtils.createNotFound('Email hoặc mật khẩu không chính xác');
    }
    // Compare hashed password
    const isMatchPassword = await passwordUtils.isMatch(user.password, req.body.password);
    if (!isMatchPassword) {
      throw httpResponseErrorUtils.createBadRequest('Email hoặc mật khẩu không chính xác');
    }
    // Check blocked user
    if (user.isBlock) {
      throw httpResponseErrorUtils.createForbidden(
        'Tài khoản của bạn đã bị tạm khoá, vui lòng liên hệ admin để được hỗ trợ',
      );
    }
    // Preprocessing data
    delete user._doc['password'];
    const accessToken = tokenUtils.generateAccessToken({
      _id: user._id,
      isAdmin: user.isAdmin,
    });
    // Return response
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
    // Check existed data before creating
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
    // Prepare data for creating new user
    const encryptedPassword = await passwordUtils.hashPassword(req.body.password);
    const user = await UsersService.createUser({
      email: req.body.email,
      password: encryptedPassword,
      fullName: req.body.fullName,
      phone: req.body.phone,
      gender: req.body.gender,
    });
    await CartsService.createCart({
      userId: user._id,
      products: [],
    });
    // Preprocessing data
    ['password', '__v', 'createdAt', 'updatedAt'].forEach((field) => {
      delete user._doc[field];
    });
    const accessToken = tokenUtils.generateAccessToken({
      _id: user._id,
      isAdmin: user.isAdmin,
    });
    // Return response
    return res.status(201).json({
      status: 'Created',
      statusCode: 201,
      responseData: {
        ...user._doc,
        accessToken,
      },
    });
  }),

  handleForgotPassword: catchAsyncFn(async (req, res, next) => {
    // Check existed
    const user = await UsersService.getUserByEmail(req.body.email);
    if (!user) {
      throw httpResponseErrorUtils.createNotFound(
        `Không tìm thấy người dùng với email: ${req.body.email}`,
      );
    }
    const existedOtp = await UserOtpsService.getOtpByUserId(user._doc._id);
    // Prepare data for otp
    const now = new Date();
    const otpCode = generateOtpUtils();
    const userOtpPayload = {
      otpCode,
      userId: user._doc._id,
      validUntil: new Date(now.getTime() + 10 * 60 * 1000),
    };
    const replacements = [
      { search: '{otpCode}', replaceValue: otpCode },
      { search: '{logoUrl}', replaceValue: `${process.env.HOST_NAME}/images/logo.jpeg` },
    ];
    const template = await parseTemplateUtils(FILE_PATH, replacements);
    // Insert into or update userotps and send mail
    const promises = [sendMailUtils(user._doc.email, SUBJECT, template)];
    if (existedOtp) {
      existedOtp.otpCode = userOtpPayload.otpCode;
      existedOtp.validUntil = userOtpPayload.validUntil;
      promises.push(existedOtp.save());
    } else {
      promises.push(UserOtpsService.createOtp(userOtpPayload));
    }
    await Promise.all(promises);
    // Return response
    return res.status(201).json({
      statusCode: 201,
      status: 'Created',
    });
  }),

  handleResendOtp: catchAsyncFn(async (req, res, next) => {
    // Check existed
    const user = await UsersService.getUserByEmail(req.body.email);
    if (!user) {
      throw httpResponseErrorUtils.createNotFound(
        `Không tìm thấy người dùng với email: ${req.body.email}`,
      );
    }
    const existedOtp = await UserOtpsService.getOtpByUserId(user._doc._id);
    if (!existedOtp) {
      throw httpResponseErrorUtils.createNotFound('Không tìm thấy lịch sử sử dụng OTP');
    }
    // Prepare data for otp
    const now = new Date();
    const otpCode = generateOtpUtils();
    const changes = {
      otpCode,
      validUntil: new Date(now.getTime() + 10 * 60 * 1000),
    };
    const replacements = [
      { search: '{otpCode}', replaceValue: otpCode },
      { search: '{logoUrl}', replaceValue: `${process.env.HOST_NAME}/images/logo.jpeg` },
    ];
    const template = await parseTemplateUtils(FILE_PATH, replacements);
    // Update and resend mail
    await Promise.all([
      UserOtpsService.updateOtpByUserId(user._doc._id, changes),
      sendMailUtils(user._doc.email, SUBJECT, template),
    ]);
    // Return response
    return res.status(201).json({
      statusCode: 201,
      status: 'Created',
    });
  }),

  handleVerifyToken: catchAsyncFn(async (req, res, next) => {}),
};
