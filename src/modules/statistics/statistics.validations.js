const Joi = require('joi');
const { ValidationTypeEnum } = require('./../../shared/enums');

const statisticSchema = Joi.object({
  startDate: Joi.date()
    .iso()
    .optional()
    .messages({
      [ValidationTypeEnum.Required]: 'Ngày bắt đầu không hợp lệ',
    }),
  endDate: Joi.date()
    .iso()
    .optional()
    .messages({
      [ValidationTypeEnum.Required]: 'Ngày kết thúc không hợp lệ',
    }),
  statisticBy: Joi.string()
    .valid('date', 'month', 'year')
    .required()
    .messages({
      [ValidationTypeEnum.Required]: 'Thống kê theo là bắt buộc.',
      [ValidationTypeEnum.Only]: 'Thống kê theo phải là một trong "ngày", "tháng", hoặc "năm".',
    }),
  orderStatus: Joi.string()
    .valid('thành công', 'đã huỷ', 'đang xử lý')
    .optional()
    .messages({
      [ValidationTypeEnum.Only]: 'Trạng thái đơn hàng không hợp lệ',
    }),
});

module.exports = {
  statisticSchema,
};
