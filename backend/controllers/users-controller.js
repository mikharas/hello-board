const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const isUniqueName = async (account_name) => {
	let userName;
	try {
		userName = await User.findOne({ account_name: account_name });
	} catch (err) {
		throw new HttpError('Something went wrong finding user', 404);
	}
	if (userName) {
		throw new HttpError('This username is taken', 409);
	}
};

const getUsers = async (req, res, next) => {
	let users;
	try {
		users = await User.find();
	} catch (err) {
		return next(new HttpError('Something went wrong retrieving users'), 404);
	}

	res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
	const errors = validationResult(req).array();

	if (errors.length > 0) {
		return next(new HttpError(`${errors[0].msg}`, 422));
	}

	const { account_name, password } = req.body;

	isUniqueName(account_name);

	let hashedPasswd;
	try {
		hashedPasswd = await bcrypt.hash(password, 12);
	} catch (err) {
		return next(new HttpError('Failed to hash password', 500));
	}

	const newUser = new User({
		account_name,
		password: hashedPasswd,
		places: [],
	});

	try {
		await newUser.save();
	} catch (err) {
		return next(new HttpError('Something went wrong creating account', 404));
	}

	let token;
	try {
		token = jwt.sign({ userId: newUser.id, account_name }, 'secret_key', {
			expiresIn: '1h',
		});
	} catch (err) {
		return next(new HttpError('Something went wrong creating token', 500));
	}

	res.send({
		accessToken: token,
		userId: newUser.id,
		account_name: newUser.account_name,
	});
};

const login = async (req, res, next) => {
	const errors = validationResult(req).array();

	if (errors.length > 0) {
		return next(new HttpError('Something went wrong with validation', 422));
	}

	const { username, password } = req.body;

	isUniqueName(username);
	let user;
	try {
		user = await User.findOne({ account_name: username });
	} catch (err) {
		const error = new HttpError('Something went wrong', 500);
		return next(error);
	}

	if (!user) {
		return next(new HttpError('User does not exist', 401));
	}

	let isValidPasswd = false;

	try {
		isValidPasswd = await bcrypt.compare(password, user.password);
	} catch (err) {
		return next(new HttpError('Something went wrong comparing password', 500));
	}

	if (!isValidPasswd) {
		return next(new HttpError('Incorrect credentials', 401));
	}

	let token;
	try {
		token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' });
	} catch (err) {
		return next(new HttpError('Something went wrong creating token', 500));
	}

	res.send({
		userId: user.id,
		account_name: user.account_name,
		accessToken: token,
	});
};

exports.isUniqueName = isUniqueName;
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
