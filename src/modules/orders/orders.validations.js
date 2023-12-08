const Joi = require('joi');
const { ValidationTypeEnum } = require('../../shared/enums');

const totalBillSchema = Joi.object({
  totalBill: Joi.number()
    .required()
    .min(20000)
    .messages({
      [ValidationTypeEnum.Required]: 'Số tiền thanh toán không được để trống',
      [ValidationTypeEnum.NumberMin]: 'Số tiền thanh toán tối thiểu là 0 đồng',
    }),
});

const userIdSchema = Joi.object({
  userId: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      [ValidationTypeEnum.Required]: 'userId không được để trống',
      [ValidationTypeEnum.StringPattern]: 'userId không hợp lệ',
    }),
});

module.exports = { totalBillSchema, userIdSchema };
