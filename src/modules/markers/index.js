const router = require('express').Router();
const ctrl = require('./markers.controller');
const { markerSchema, markerIdSchema } = require('./markers.validation');
const { validateRequestMiddleware } = require('../../shared/middleware');

router
  .route('/:markerId')
  .all(validateRequestMiddleware('params', markerIdSchema))
  .get(ctrl.getMarkerById)
  .patch(validateRequestMiddleware('body', markerSchema), ctrl.updateMarker)
  .delete(ctrl.deleteMarker);

router
  .route('/')
  .get(ctrl.getAllMarkers)
  .post(validateRequestMiddleware('body', markerSchema), ctrl.createMarker);

module.exports = router;
