const router = require('express').Router();
const ctrl = require('./product-types.controller');
const { validateRequestMiddleware } = require('../../shared/middleware');
const { createProductSchema } = require('../products/products.validation');

router
  .route('/')
  .get(ctrl.getAllProductTypes)
  .post(validateRequestMiddleware('body', createProductSchema), ctrl.createProductType);

module.exports = router;
