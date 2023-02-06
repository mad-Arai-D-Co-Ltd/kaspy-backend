const router = require('express').Router();
const orderController = require('../../../controllers/v1/Order.controller');
const auth = require('../../../utils/auth');


// Order templates //
/**
 * /api/v1/order/create-order-temp
 * */
router.post('/create-order-temp',auth.isAuth, orderController.createOrderTemplate);

/**
 * /api/v1/order/update-order-temp/:orderTempId
 * */
router.put('/update-order-temp/:orderTempId',auth.isAuth, orderController.updateOrderTemplate);

/**
 * /api/v1/order/order-temp-list
 * */
router.get("/order-temp-list", orderController.getOrderTempList);

/**
 * /api/v1/order/create-order-temp-prod
 * */
router.post("/create-order-temp-prod", orderController.createOrderTemplateProduct);

/**
 * /api/v1/order/create-order-temp-prod-list
 * */
router.post("/create-order-temp-prod-list", orderController.createOrderProductTempList);

/**
 * /api/v1/order/delete-product-temp/{id} DELETE
 */
router.delete('/delete-product-temp/:id',auth.isAuth,orderController.deleteProdTemp);


// Order templates //

module.exports = router;
