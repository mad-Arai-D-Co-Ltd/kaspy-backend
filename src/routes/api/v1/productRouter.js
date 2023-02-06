const router = require('express').Router();
const productController = require('../../../controllers/v1/Product.controller');
const auth = require('../../../utils/auth');

/**
 * /api/v1/product/create-product
 * */
router.post('/create-product',auth.isAuth, productController.createProduct);


/**
 * /api/v1/product/product-list
 * */
router.get("/product-list", productController.getProductList);

/**
 * /api/v1/product/update-product
 * */
router.put('/update-product/:productId',auth.isAuth, productController.updateProduct);

router.post('/update-product-list',auth.isAuth, productController.updateProductList);


module.exports = router;
