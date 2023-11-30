const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().required().min(3).max(30),
  prices: Joi.array().items(
    Joi.object({
      size: Joi.string().required().valid('S', 'M', 'L'),
      price: Joi.number().required().min(0),
    }),
  ),
  productType: Joi.string().required().length(24), // Assuming product type IDs are 24 characters long
  desc: Joi.string().allow(''), // Optional field
  markers: Joi.array().items(Joi.string()),
  images: Joi.array().items(Joi.any()),
});

module.exports = {
  createProductSchema,
};
