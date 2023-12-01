const Joi = require('joi');
const { ValidationTypeEnum } = require('../../shared/enums');

const createMarkerSchema = Joi.object({
  markerName: Joi.string()
    .required()
    .messages({
      [ValidationTypeEnum.Required]: 'Tên marker không được để trống',
    }),
});

module.exports = {
  createMarkerSchema,
};
