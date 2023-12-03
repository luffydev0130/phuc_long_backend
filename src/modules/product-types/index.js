const router = require('express').Router();
const ctrl = require('./product-types.controller');
const { validateRequestMiddleware } = require('../../shared/middleware');
const { productTypeNameSchema, productTypeIdSchema } = require('./product-types.validation');

router
  .route('/:productTypeId')
  .all(validateRequestMiddleware('params', productTypeIdSchema))
  .get(ctrl.getProductTypeById)
  .patch(validateRequestMiddleware('body', productTypeNameSchema), ctrl.updateProductType)
  .delete(ctrl.deleteProductType);

router
  .route('/')
  .get(ctrl.getAllProductTypes)
  .post(validateRequestMiddleware('body', productTypeNameSchema), ctrl.createProductType);

module.exports = router;
