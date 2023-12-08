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

module.exports = { totalBillSchema };
