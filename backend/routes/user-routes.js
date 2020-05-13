const express = require('express');
const { check } = require('express-validator');

const { isUniqueName, getUsers, signup, login } = require('../controllers/users-controller');

const router = express.Router();

router.get('/', getUsers);

router.post(
	'/signup',
	[
		check('account_name')
			.custom((account) => isUniqueName(account))
			.withMessage('This username is taken.')
	],
	signup
);

router.post(
	'/login',
	login
);

module.exports = router;

