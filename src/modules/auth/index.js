const router = require('express').Router();
const ctrl = require('./auth.controller');
const { loginSchema, registerSchema, forgotPasswordSchema } = require('./auth.validations');
const { validateRequestMiddleware } = require('../../shared/middleware');

router.post('/login', validateRequestMiddleware('body', loginSchema), ctrl.handleLogin);
router.post('/register', validateRequestMiddleware('body', registerSchema), ctrl.handleRegister);
router.post(
  '/forgot-password',
  validateRequestMiddleware('body', forgotPasswordSchema),
  ctrl.handleForgotPassword,
);

module.exports = router;
