const { UsersService } = require('../../shared/services');
const { catchAsyncFn, httpResponseErrorUtils, passwordUtils } = require('../../shared/utils');

module.exports = {
  getAllUsers: catchAsyncFn(async (req, res, next) => {
    const users = await UsersService.getAllUsers();
    return res.status(200).json({
      statusCode: 200,
      status: 'OK',
      responseData: users,
    });
  }),

  createUser: catchAsyncFn(async (req, res, next) => {
    const existedUser = await UsersService.getUserByEmail(req.body.email);
    if (existedUser) {
      throw httpResponseErrorUtils.createBadRequest(
        'Email đã tồn tại, vui lòng sử dụng email khác',
      );
    }
    const encryptedPassword = await passwordUtils.hashPassword(req.body.password);
    const user = await UsersService.createUser({
      email: req.body.email,
      password: encryptedPassword,
      fullName: req.body.fullName,
      phone: req.body.phone,
      gender: req.body.gender,
      isAdmin: req.body.isAdmin,
    });
    ['password', '__v', 'createdAt', 'updatedAt'].forEach((field) => {
      delete user._doc[field];
    });
    return res.status(201).json({
      statusCode: 201,
      status: 'Created',
      responseData: user,
    });
  }),

  getUserById: catchAsyncFn(async (req, res, next) => {
    const user = await UsersService.getUserById(req.params.userId);
    if (!user) {
      throw httpResponseErrorUtils.createNotFound(
        `Không tìm thấy người dùng có Id: ${req.params.userId}`,
      );
    }
    return res.status(200).json({
      statusCode: 200,
      status: 'OK',
      responseData: user,
    });
  }),

  updateUser: catchAsyncFn(async (req, res, next) => {
    const user = await UsersService.getUserById(req.params.userId);
    if (!user) {
      throw httpResponseErrorUtils.createNotFound(
        `Không tìm thấy người dùng có Id: ${req.params.userId}`,
      );
    }
    const changes = {};
    for (const field of Object.keys(req.body)) {
      switch (field) {
        case 'password': {
          changes.password = await passwordUtils.hashPassword(req.body.password);
          break;
        }
        case 'fullName': {
          changes.fullName = req.body.fullName;
          break;
        }
        case 'phone': {
          changes.phone = req.body.phone;
          break;
        }
        case 'address': {
          changes.address = req.body.address;
          break;
        }
        case 'gender': {
          changes.gender = req.body.gender;
          break;
        }
        case 'isAdmin': {
          changes.isAdmin = req.body.isAdmin;
          break;
        }
        case 'isBlock': {
          changes.isBlock = req.body.isBlock;
          break;
        }
      }
    }
    const updatedUser = await UsersService.updateUser(req.params.userId, changes);
    return res.status(200).json({
      statusCode: 200,
      status: 'Updated',
      responseData: updatedUser,
    });
  }),

  deleteUser: catchAsyncFn(async (req, res, next) => {
    const user = await UsersService.getUserById(req.params.userId);
    if (!user) {
      throw httpResponseErrorUtils.createNotFound(
        `Không tìm thấy người dùng có Id: ${req.params.userId}`,
      );
    }
    await UsersService.deleteUser(req.params.userId);
    return res.status(204).send();
  }),
};
