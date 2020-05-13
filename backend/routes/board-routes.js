const express = require('express');
const { check } = require('express-validator');
const checkAuth = require('../middleware/check-auth');

const { getBoardById, getUserBoardsById, createBoard,
	updateBoard, deleteBoard } = require('../controllers/boards-controllers');

const router = express.Router();

router.use(checkAuth);

router.get('/:bid', getBoardById);

router.get('/user/:uid', getUserBoardsById);

router.post(
	'/',
	[
		check('title')
			.not()
			.isEmpty().withMessage('Must not be empty')
	],
	createBoard
);

router.patch(
	'/:bid',
	[
		check('title')
			.not()
			.isEmpty().withMessage('Must not be empty')
	],
	updateBoard
);

router.delete('/:bid', deleteBoard);

module.exports = router;
