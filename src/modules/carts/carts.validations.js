const Joi = require('joi');
const { ValidationTypeEnum } = require('../../shared/enums');

const userIdSchema = Joi.object({
  userId: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      [ValidationTypeEnum.Required]: 'userId không được để trống',
      [ValidationTypeEnum.StringPattern]: 'userId không hợp lệ',
    }),
});

const updateCartSchema = Joi.object({
  products: Joi.array().items(
    Joi.object({
      productId: Joi.string()
        .required()
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
          [ValidationTypeEnum.Required]: 'productId không được để trống',
          [ValidationTypeEnum.StringPattern]: 'productId không hợp lệ',
        }),
      size: Joi.string()
        .valid('s', 'm', 'l')
        .insensitive()
        .required()
        .messages({
          [ValidationTypeEnum.Required]: 'Kích thước không được để trống',
          [ValidationTypeEnum.Only]: 'Kích thước không hợp lệ',
        }),
      amount: Joi.number()
        .required()
        .messages({
          [ValidationTypeEnum.Required]: 'Số lượng không được để trống',
        }),
      image: Joi.string(),
    }),
  ),
});

module.exports = {
  userIdSchema,
  updateCartSchema,
};
