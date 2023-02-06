const router = require('express').Router();
const orderHisController = require('../../../controllers/v1/OrderHis.controller');
const auth = require('../../../utils/auth');


// Order historys //
/**
 * /api/v1/order-his/create-order-his
 * */
router.post('/create-order-his',auth.isAuth, orderHisController.createOrderHistory);

/**
 * /api/v1/order-his/order-his-list
 * */
router.get("/order-his-list", orderHisController.getOrderHisList);



// Order historys //

module.exports = router;
