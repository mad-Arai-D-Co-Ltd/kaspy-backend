const router = require('express').Router();
const unitController = require('../../../controllers/v1/Unit.controller');
const auth = require('../../../utils/auth');

/**
 * /api/v1/unit/create-unit
 * */
router.post('/create-unit',auth.isAuth, unitController.createUnit);


/**
 * /api/v1/unit/unit-list
 * */
router.get("/unit-list", unitController.getUnitsList);

module.exports = router;
