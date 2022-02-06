const {body} = require('express-validator');
module.exports = {
	user: [
		body('password').isLength({min: 3}),
		body('name').isLength({min: 2}),
		body('email').isEmail(),
	],
};
