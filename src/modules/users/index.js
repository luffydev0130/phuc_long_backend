const router = require('express').Router();
const ctrl = require('./user.controller');
const { createUserSchema } = require('./user.validations');
const { validateRequestMiddleware } = require('../../shared/middleware');

router.route('/:userId').get(ctrl.getUserById);

router
  .route('/')
  .get(ctrl.getAllUsers)
  .post(validateRequestMiddleware('body', createUserSchema), ctrl.createUser);

module.exports = router;
