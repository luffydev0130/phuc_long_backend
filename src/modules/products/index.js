const router = require('express').Router();
const {
  validateRequestMiddleware,
  parseJsonStr2ObjMiddleware,
} = require('../../shared/middleware');
const ctrl = require('./products.controller');
const { uploadFilesUtils } = require('../../shared/utils');
const {
  createProductSchema,
  getAllProductsSchema,
  productIdSchema,
} = require('./products.validation');

router
  .route('/:productId')
  .all(validateRequestMiddleware('params', productIdSchema))
  .get(ctrl.getProductById)
  .patch(uploadFilesUtils.array('images', 5), ctrl.handleUpdateProduct)
  .delete(ctrl.handleDeleteProduct);

router
  .route('/')
  .get(validateRequestMiddleware('query', getAllProductsSchema), ctrl.getAllProducts)
  .post(
    uploadFilesUtils.fields([{ name: 'images', maxCount: 5 }]),
    parseJsonStr2ObjMiddleware(['prices']),
    validateRequestMiddleware('body', createProductSchema),
    ctrl.handleCreateProduct,
  );

module.exports = router;
