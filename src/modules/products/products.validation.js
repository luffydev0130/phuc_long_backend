const Joi = require('joi');
const { ValidationTypeEnum } = require('../../shared/enums');

const getAllProductsSchema = Joi.object({
  name: Joi.string().messages({
    'any.empty': 'Tên sản phẩm không được để trống.',
  }),
  productType: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      'string.pattern.base': 'Loại sản phẩm phải là một chuỗi gồm 24 ký tự hex.',
    }),
  markers: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .messages({
      'array.base': 'Thẻ sản phẩm phải là một mảng.',
      'string.pattern.base': 'Mỗi thẻ sản phẩm phải là một chuỗi gồm 24 ký tự hex.',
    }),
  page: Joi.number().min(1).default(1).messages({
    'number.base': 'Trang phải là một số nguyên.',
    'number.min': 'Trang phải lớn hơn hoặc bằng 1.',
  }),
  pageSize: Joi.number().min(1).max(100).default(10).messages({
    'number.base': 'Số lượng sản phẩm mỗi trang phải là một số nguyên.',
    'number.min': 'Số lượng sản phẩm mỗi trang phải lớn hơn hoặc bằng 1.',
    'number.max': 'Số lượng sản phẩm mỗi trang không được vượt quá 100.',
  }),
});

const createProductSchema = Joi.object({
  name: Joi.string().required().min(3).max(30).messages({
    'any.required': 'Tên sản phẩm là bắt buộc.',
    'string.min': 'Tên sản phẩm phải có ít nhất 3 ký tự.',
    'string.max': 'Tên sản phẩm không được quá 30 ký tự.',
  }),
  prices: Joi.array()
    .items(
      Joi.object({
        size: Joi.string().required().valid('S', 'M', 'L').messages({
          'any.required': 'Kích thước là bắt buộc.',
          'string.base': 'Kích thước phải là một chuỗi.',
          'any.only': 'Kích thước chỉ có thể là "S", "M" or "L".',
        }),
        price: Joi.number().required().min(0).messages({
          'any.required': 'Giá là bắt buộc.',
          'number.base': 'Giá phải là một số.',
          'number.min': 'Giá phải lớn hơn hoặc bằng 0.',
        }),
      }),
    )
    .messages({
      'array.base': 'Giá phải là một mảng.',
    }),
  productType: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      'any.required': 'Loại sản phẩm là bắt buộc.',
      'string.pattern.base': 'Loại sản phẩm phải là một chuỗi gồm 24 ký tự hex.',
    }),
  desc: Joi.string().allow('').messages({
    'string.empty': 'Mô tả có thể để trống.',
  }),
  markers: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .messages({
      'array.base': 'Thẻ sản phẩm phải là một mảng.',
      'string.pattern.base': 'Mỗi thẻ sản phẩm phải là một chuỗi gồm 24 ký tự hex.',
    }),
  images: Joi.array().items(Joi.any()).messages({
    'array.base': 'Hình ảnh phải là một mảng.',
  }),
});

const productIdSchema = Joi.object({
  productId: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      [ValidationTypeEnum.Required]: 'productId không được để trống',
      [ValidationTypeEnum.StringPattern]: 'productId không hợp lệ',
    }),
});

module.exports = {
  productIdSchema,
  createProductSchema,
  getAllProductsSchema,
};
