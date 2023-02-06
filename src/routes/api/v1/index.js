const router = require('express').Router();

router.use('/healthCheck', require('./healthCheck'));
router.use('/auth', require('./authRouter'));
router.use('/user', require('./userRouter'));
router.use('/product', require('./productRouter'));
router.use('/unit', require('./unitRouter'));
router.use('/order', require('./orderRouter'));
router.use('/order-his', require('./orderHisRouter'));
module.exports = router;
