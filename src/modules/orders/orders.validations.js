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

const orderIdSchema = Joi.object({
  orderId: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      [ValidationTypeEnum.Required]: 'userId không được để trống',
      [ValidationTypeEnum.StringPattern]: 'userId không hợp lệ',
    }),
});

const updateOrderSchema = Joi.object({
  paymentStatus: Joi.string()
    .valid('chưa thanh toán', 'đã thanh toán', 'đã hoàn tiền')
    .optional()
    .messages({
      'string.base': 'Trạng thái thanh toán phải là một chuỗi',
      'any.only': 'Trạng thái thanh toán phải là một trong những giá trị sau: {{#valids}}',
    }),
  deliveryStatus: Joi.string()
    .valid('đang giao hàng', 'đã giao hàng', 'giao hàng thất bại')
    .optional()
    .messages({
      'string.base': 'Trạng thái vận chuyển phải là một chuỗi',
      'any.only': 'Trạng thái vận chuyển phải là một trong những giá trị sau: {{#valids}}',
    }),
  orderStatus: Joi.string()
    .valid('chưa thanh toán', 'đã thanh toán', 'huỷ đơn hàng', 'đang xử lý')
    .optional()
    .messages({
      'string.base': 'Trạng thái đơn hàng phải là một chuỗi',
      'any.only': 'Trạng thái đơn hàng phải là một trong những giá trị sau: {{#valids}}',
    }),
  notes: Joi.string().optional().messages({
    'string.base': 'Ghi chú phải là một chuỗi',
  }),
});

module.exports = { totalBillSchema, userIdSchema, updateOrderSchema, orderIdSchema };
