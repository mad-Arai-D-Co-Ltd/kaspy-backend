const router = require('express').Router();
const userController = require('../../../controllers/v1/User.controller');
const auth = require('../../../utils/auth');

/**
 * /api/v1/user/create-user
 * */
router.post('/create-user',auth.isAuth, userController.createUser);


/**
 * /api/v1/user/user-list
 * */
router.get("/user-list", userController.getUserList);

/**
 * /api/v1/user/role-list
 * */
router.get("/role-list", userController.getRoleList);


module.exports = router;
