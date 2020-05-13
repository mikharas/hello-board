const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const Board = require('../models/board');
const User = require('../models/user');

// Middleware

const getBoardById = async (req, res, next) => {
	const boardId = req.params.bid;

	let board;

	try {
		board = await Board.findById(boardId);
	} catch(err) {
		const error = new HttpError('Could not find a board with the id', 500);
		return next(error);
	}

	if (!board) {
		const error = new HttpError('Could not find a board for the provided id', 404);
		return next(error);
	}
	res.json({ board: board.toObject( {getters: true} ) });
};

const getUserBoardsById = async (req, res, next) => {
	const userId = req.params.uid;

	let userWithBoards;

	try {
		userWithBoards = await User.findById(userId).populate('boards');
	} catch(err) {
		return next(new HttpError('Failed to fetch boards', 500));
	}

	res.json({ boards: userWithBoards.boards.map(board => board.toObject({ getters: true })) });
};

const createBoard = async (req, res, next) => {
	const errors = validationResult(req).array();

	if (errors.length > 0) {
		return next(new HttpError(`${errors[0].msg}`, 422));
	}

	const { title } = req.body;

	const newBoard = new Board({
		title,
		creator: req.userData.userId,
		columns: {
			'column-1': {
				id: 'column-1',
				title: 'Your first column!',
				taskIds: []
			}
		},
		columnOrder: ['column-1']
	});

	let user;
	try {
		user = await User.findById(req.userData.userId);
	} catch(error) {
		return next(new HttpError('Failed to create board', 500));
	}

	if (!user) {
		return next(new HttpError('Could not find user'), 404);
	}

	try {
		await newBoard.save();
	  user.boards.push(newBoard);
		await user.save();
	} catch(error) {
		return next(new HttpError('Failed to create board this', 500));
	}
	res.json({board: newBoard.toObject({ getters: true })});
};

const updateBoard = async(req, res, next) => {
	const errors = validationResult(req).array();

	if (errors.length > 0) {
		return next(new HttpError(`${errors[0].msg}`, 422));
	}

	const { title, tasks, columns, columnOrder } = req.body;
	const boardId = req.params.bid;

	let board;
	try {
		board = await Board.findById(boardId);
	} catch(err) {
		return next(new HttpError('Something went wrong saving', 404));
	}

	if (board.creator.toString() !== req.userData.userId) {
		return next(new HttpError('You are not authorized to make changes', 401));
	}

	board.title = title;
	board.tasks = tasks;
	board.columns = columns;
	board.columnOrder = columnOrder;

	try {
		await board.save();
	} catch(err) {
		return next(new HttpError('Something went wrong saving', 500));
	}

	res.json({ board: board.toObject({ getters: true }) });
};

const deleteBoard = async (req, res, next) => {
	const boardId = req.params.bid;

	let board;
	try {
		board = await Board.findById(boardId).populate('creator');
	} catch(err) {
		return next(new HttpError('Something went wrong deleting the board'), 500);
	}

	if (!board) {
		return next(new HttpError('Could not find place id', 404));
	}

	if (board.creator.id !== req.userData.userId) {
		return next(new HttpError('You are not authorized to make changes', 401));
	}

	try {
		await board.remove();
		board.creator.boards.pull(board);
		await board.creator.save();
	} catch(err) {
		return next(new HttpError('Something went wrong deleting the board', 500));
	}

	res.json({ message: 'Successfully deleted board.' });
};

exports.getBoardById = getBoardById;
exports.getUserBoardsById = getUserBoardsById;
exports.createBoard = createBoard;
exports.updateBoard = updateBoard;
exports.deleteBoard = deleteBoard;
