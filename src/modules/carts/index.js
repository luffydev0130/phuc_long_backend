const router = require('express').Router();
const ctrl = require('./carts.controller');
const { userIdSchema, updateCartSchema } = require('./carts.validations');
const { validateRequestMiddleware } = require('../../shared/middleware');

router
  .route('/users/:userId')
  .all(validateRequestMiddleware('params', userIdSchema))
  .get(ctrl.getCartByUserId)
  .patch(validateRequestMiddleware('body', updateCartSchema), ctrl.updateCart);
module.exports = router;
