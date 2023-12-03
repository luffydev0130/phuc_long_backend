const router = require('express').Router();
const ctrl = require('./user.controller');
const { uploadFilesUtils } = require('../../shared/utils');
const { createUserSchema, userIdSchema } = require('./user.validations');
const { validateRequestMiddleware } = require('../../shared/middleware');

router
  .route('/:userId')
  .all(validateRequestMiddleware('params', userIdSchema))
  .get(ctrl.getUserById)
  .patch(uploadFilesUtils.single('avatar'), ctrl.updateUser)
  .delete(ctrl.deleteUser);

router
  .route('/')
  .get(ctrl.getAllUsers)
  .post(validateRequestMiddleware('body', createUserSchema), ctrl.createUser);

module.exports = router;
