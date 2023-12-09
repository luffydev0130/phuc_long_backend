const router = require('express').Router();
const ctrl = require('./statistics.controller');
const { statisticSchema } = require('./statistics.validations');
const { validateRequestMiddleware } = require('../../shared/middleware');

router
  .route('/')
  .get(validateRequestMiddleware('query', statisticSchema), ctrl.handleCalculateStatistics);

module.exports = router;
