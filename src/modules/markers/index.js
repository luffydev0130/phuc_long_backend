const router = require('express').Router();
const ctrl = require('./markers.controller');
const { createMarkerSchema } = require('./markers.validation');
const { validateRequestMiddleware } = require('../../shared/middleware');

router
  .route('/')
  .get(ctrl.getAllMarkers)
  .post(validateRequestMiddleware('body', createMarkerSchema), ctrl.createMarker);

module.exports = router;
