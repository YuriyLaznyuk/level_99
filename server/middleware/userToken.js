const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		next();
	}
	try {
		const token = req.headers.authorization.split(' ')[1];
		if (!token) {
			return res.status(401).json({
				message: 'user is logged in',
				error: 'token is not exists',
			});
		}
		req.user = jwt.verify(token, process.env.SECRET_KEY);
		next();
	} catch (e) {
		res.status(401).json({
			message: 'user is logged in',
			error: e.message,
		});
	}
};
