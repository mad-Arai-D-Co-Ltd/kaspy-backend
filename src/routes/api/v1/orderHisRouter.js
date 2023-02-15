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
router.post("/order-his-list", orderHisController.getOrderHisList);

/**
 * /api/v1/order-his/update-prod-his
 * */
router.post('/update-prod-his',auth.isAuth, orderHisController.updateOrderProdCostHistory);

/**
 * /api/v1/order-his/delete-order-his/{orderHisId} DELETE
 */
router.delete('/delete-order-his/:id',
//  auth.isAuth, 
orderHisController.deleteOrderHis); 


// Order historys //

module.exports = router;
