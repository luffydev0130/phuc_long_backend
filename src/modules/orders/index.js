const router = require('express').Router();
const ctrl = require('./orders.controller');
const { totalBillSchema, userIdSchema } = require('./orders.validations');
const { validateRequestMiddleware } = require('../../shared/middleware');

router.post(
  '/payment_intents',
  validateRequestMiddleware('body', totalBillSchema),
  ctrl.handleSetUpPaymentIntent,
);
router
  .route('/users/:userId')
  .all(validateRequestMiddleware('params', userIdSchema))
  .get(ctrl.handleGetOrderByUserId);
router.route('').get(ctrl.handleGetOrders).post(ctrl.handleCreateOrder);

module.exports = router;
