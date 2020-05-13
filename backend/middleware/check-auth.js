const HttpError = require('../models/http-error');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	let token;
	try {
		token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer: TOKEN'
		// no authorization header
		if (!token) {
			throw new HttpError('Authentication failed first');
		}
		// verify token. the key must be equal
		const decodedToken = jwt.verify(token, 'secret_key');
		req.userData = {
			userId: decodedToken.userId,
			account_name: decodedToken.account_name
		};
		next();
	} catch(err) {
		return next(new HttpError('Authentication failed second'));
	}
};
