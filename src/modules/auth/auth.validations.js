const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().required().email().messages({
    'string.email': 'Email không hợp lệ',
    'any.required': 'Email không được để trống',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Mật khẩu không được để trống',
  }),
});

const registerSchema = Joi.object({
  email: Joi.string().required().email().messages({
    'string.email': 'Email không hợp lệ',
    'any.required': 'Email không được để trống',
  }),
  password: Joi.string().required().min(6).messages({
    'string.min': 'Mật khẩu phải có ít nhất 6 ký tự',
    'any.required': 'Mật khẩu không được để trống',
  }),
  fullName: Joi.string().required().messages({
    'any.required': 'Họ và tên không được để trống',
  }),
  phone: Joi.string()
    .required()
    .pattern(/^(0|\+84)([0-9]{9})$/)
    .messages({
      'any.required': 'Điện thoại không được để trống',
      'string.pattern.base': 'Số điện thoại không hợp lệ',
    }),
  gender: Joi.string().valid('nam', 'nữ', 'khác').insensitive().messages({
    'any.only': 'Giới tính không hợp lệ, giá trị hợp lệ: Nam, Nữ, Khác',
  }),
});

module.exports = {
  loginSchema,
  registerSchema,
};
