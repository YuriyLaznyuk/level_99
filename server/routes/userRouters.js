const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');
const validator = require('../middleware/userValidator');
const userToken = require('../middleware/userToken');

router
	.route('/api/registration')
	.post(validator.user, userControllers.createUser);

router.route('/api/authorization').post(userControllers.loginUser);

router.route('/api/auth').post(userToken, userControllers.authUser);
module.exports = router;
