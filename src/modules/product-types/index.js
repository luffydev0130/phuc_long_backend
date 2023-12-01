const router = require('express').Router();
const ctrl = require('./product-types.controller');
const { validateRequestMiddleware } = require('../../shared/middleware');
const { createProductTypeSchema } = require('./product-types.validation');

router
  .route('/')
  .get(ctrl.getAllProductTypes)
  .post(validateRequestMiddleware('body', createProductTypeSchema), ctrl.createProductType);

module.exports = router;
