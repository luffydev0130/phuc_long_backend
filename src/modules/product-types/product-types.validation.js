const Joi = require('joi');
const { ValidationTypeEnum } = require('../../shared/enums');

const createProductTypeSchema = Joi.object({
  productTypeName: Joi.string()
    .required()
    .messages({
      [ValidationTypeEnum.Required]: 'Tên loại sản phẩm không được để trống',
    }),
});

module.exports = {
  createProductTypeSchema,
};
