const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
	title: String,
	creator: { type: mongoose.Types.ObjectId, ref: 'User' },
	tasks: { type: mongoose.Schema.Types.Mixed, default: {} },
	columns: { type: mongoose.Schema.Types.Mixed, default: {} },
	columnOrder: [String]
}, { minimize: false });

module.exports = mongoose.model('Board', boardSchema, 'boards');
