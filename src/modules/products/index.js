const router = require('express').Router();
const {
  validateRequestMiddleware,
  parseJsonStr2ObjMiddleware,
} = require('../../shared/middleware');
const { uploadFilesUtils } = require('../../shared/utils');
const ctrl = require('./products.controller');
const { createProductSchema } = require('./products.validation');

router
  .route('/')
  .post(
    uploadFilesUtils.fields([{ name: 'images', maxCount: 5 }]),
    parseJsonStr2ObjMiddleware(['prices']),
    validateRequestMiddleware('body', createProductSchema),
    ctrl.handleCreateProduct,
  );

module.exports = router;
