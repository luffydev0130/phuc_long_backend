const Joi = require('joi');

const getAllProductsSchema = Joi.object({
  name: Joi.string(),
  productType: Joi.string().regex(/^[0-9a-fA-F]{24}$/), // MongoDB ObjectId validation
  markers: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)), // MongoDB ObjectId validation
  page: Joi.number().min(1).default(1),
  pageSize: Joi.number().min(1).max(100).default(10),
});

const createProductSchema = Joi.object({
  name: Joi.string().required().min(3).max(30),
  prices: Joi.array().items(
    Joi.object({
      size: Joi.string().required().valid('S', 'M', 'L'),
      price: Joi.number().required().min(0),
    }),
  ),
  productType: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/), // Assuming product type IDs are 24 characters long
  desc: Joi.string().allow(''), // Optional field
  markers: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
  images: Joi.array().items(Joi.any()),
});

module.exports = {
  createProductSchema,
  getAllProductsSchema,
};
