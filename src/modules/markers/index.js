const router = require('express').Router();
const ctrl = require('./markers.controller');

router.route('/').get(ctrl.getAllMarkers).post(ctrl.createMarker);

module.exports = router;
