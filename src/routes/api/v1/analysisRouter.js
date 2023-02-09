const router = require('express').Router();
const analysisController = require('../../../controllers/v1/Analysis.controller');
const auth = require('../../../utils/auth');

/**
 * /api/v1/analysis/prod-analysis-list
 * */
router.get("/prod-analysis-list", analysisController.getProdTotalList);

/**
 * /api/v1/analysis/prod-price-his/:productId
 * */
router.get("/prod-price-his/:productId", analysisController.getProdPriceHis);


/**
 * /api/v1/analysis/weekly-sales
 * */
router.get("/weekly-sales", analysisController.getWeeklySales);

/**
 * /api/v1/analysis/weekly-orders
 * */
router.get("/weekly-orders", analysisController.getWeeklyOrder);

/**
 * /api/v1/analysis/weekly-users
 * */
router.get("/weekly-users", analysisController.getWeeklyNewUser);


/**
 * /api/v1/analysis/shop-order-total
 * */
router.get("/shop-order-total", analysisController.getShopOrderTemp);


/**
 * /api/v1/analysis/weekly-top-spend
 * */
router.get("/weekly-top-spend", analysisController.getWeeklyOrderTop);


// Order historys //

module.exports = router;
