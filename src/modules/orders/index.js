const router = require('express').Router();
const ctrl = require('./orders.controller');
const { totalBillSchema } = require('./orders.validations');
const { validateRequestMiddleware } = require('../../shared/middleware');

router.post(
  '/payment_intents',
  validateRequestMiddleware('body', totalBillSchema),
  ctrl.handleSetUpPaymentIntent,
);

router.route('').get(ctrl.handleGetOrders).post(ctrl.handleCreateOrder);

module.exports = router;
