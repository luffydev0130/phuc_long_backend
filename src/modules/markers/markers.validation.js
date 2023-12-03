const Joi = require('joi');
const { ValidationTypeEnum } = require('../../shared/enums');

const markerSchema = Joi.object({
  markerName: Joi.string()
    .required()
    .messages({
      [ValidationTypeEnum.Required]: 'Tên marker không được để trống',
    }),
});

const markerIdSchema = Joi.object({
  markerId: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      [ValidationTypeEnum.Required]: 'markerId không được để trống',
      [ValidationTypeEnum.StringPattern]: 'markerId không hợp lệ',
    }),
});

module.exports = {
  markerSchema,
  markerIdSchema,
};
