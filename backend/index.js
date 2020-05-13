const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const HttpError = require('./models/http-error');
const boardRoutes = require('./routes/board-routes');
const userRoutes = require('./routes/user-routes');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/boards', boardRoutes);

app.use((req, res, next) => {
	const error = new HttpError('Route doens\'t exist', 404);
	return next(error);
});

app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ message:  error.message || 'An unknown error occurred!' });
});

mongoose
	.connect('mongodb://127.0.0.1:27017')
	.then(() => app.listen(3000))
	.catch(err => console.log(err));
