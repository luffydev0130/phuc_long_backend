const Joi = require('joi');
const { ValidationTypeEnum } = require('../../shared/enums');

const createUserSchema = Joi.object({
  email: Joi.string()
    .required()
    .email()
    .messages({
      [ValidationTypeEnum.Required]: 'Email không được để trống',
      [ValidationTypeEnum.Email]: 'Email không hợp lệ',
    }),
  password: Joi.string()
    .required()
    .min(6)
    .messages({
      [ValidationTypeEnum.Required]: 'Mật khẩu không được để trống',
      [ValidationTypeEnum.MinLength]: 'Mật khẩu phải có ít nhất 6 ký tự',
    }),
  fullName: Joi.string()
    .required()
    .messages({
      [ValidationTypeEnum.Required]: 'Họ và tên không được để trống',
    }),
  phone: Joi.string()
    .required()
    .pattern(/^(0|\+84)([0-9]{9})$/)
    .messages({
      [ValidationTypeEnum.Required]: 'Điện thoại không được để trống',
      [ValidationTypeEnum.StringPattern]: 'Số điện thoại không hợp lệ',
    }),
  gender: Joi.string()
    .valid('nam', 'nữ', 'khác')
    .insensitive()
    .messages({
      [ValidationTypeEnum.Only]: 'Giới tính không hợp lệ, giá trị hợp lệ: Nam, Nữ, Khác',
    }),
  isAdmin: Joi.boolean()
    .required()
    .messages({
      [ValidationTypeEnum.Required]: 'isAdmin không được để trống',
    }),
});

const updateUserSchema = Joi.object({
  fullName: Joi.string().optional(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};
