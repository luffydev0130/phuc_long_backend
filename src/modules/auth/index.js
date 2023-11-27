const router = require('express').Router();
const ctrl = require('./auth.controller');
const { loginSchema, registerSchema } = require('./auth.validations');
const { validateRequestMiddleware } = require('../../shared/middleware');

router.post('/login', validateRequestMiddleware('body', loginSchema), ctrl.handleLogin);
router.post('/register', validateRequestMiddleware('body', registerSchema), ctrl.handleRegister);

module.exports = router;
