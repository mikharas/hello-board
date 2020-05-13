const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	account_name: String,
	password: String,
	boards: [{ type: mongoose.Types.ObjectId, ref: 'Board' }]
});

module.exports = mongoose.model('User', userSchema, 'users');
