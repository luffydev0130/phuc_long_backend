const router = require('express').Router();
const ctrl = require('./product-types.controller');

router.route('/').get(ctrl.getAllProductTypes).post(ctrl.createProductType);

module.exports = router;
