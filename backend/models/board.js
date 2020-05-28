const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
	title: String,
	selectedColumn: String,
	creator: { type: mongoose.Types.ObjectId, ref: 'User' },
	todoItems: { type: mongoose.Schema.Types.Mixed, default: {} },
	tasks: { type: mongoose.Schema.Types.Mixed, default: {} },
	columns: { type: mongoose.Schema.Types.Mixed, default: {} },
	columnOrder: [String]
}, { minimize: false });

module.exports = mongoose.model('Board', boardSchema, 'boards');
