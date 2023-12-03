const Joi = require('joi');
const { ValidationTypeEnum } = require('../../shared/enums');

const productTypeNameSchema = Joi.object({
  productTypeName: Joi.string()
    .required()
    .messages({
      [ValidationTypeEnum.Required]: 'Tên loại sản phẩm không được để trống',
    }),
});

const productTypeIdSchema = Joi.object({
  productTypeId: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      [ValidationTypeEnum.Required]: 'productTypeId không được để trống',
      [ValidationTypeEnum.StringPattern]: 'productTypeId không hợp lệ',
    }),
});

module.exports = {
  productTypeNameSchema,
  productTypeIdSchema,
};
