const {body} = require('express-validator');
module.exports = {
	user: [body('password').isLength({min: 3}), body('email').isEmail()],
};
