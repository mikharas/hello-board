const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const HttpError = require('./models/http-error');
const boardRoutes = require('./routes/board-routes');
const userRoutes = require('./routes/user-routes');
const env = process.env.NODE_ENV;
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

if (env === 'production') {
	app.use(express.static(__dirname + '/client/build'));

	// All routes other than above will go to index.html
	app.get('*', (req, res) => {
		res.sendFile(__dirname + '/client/build/index.html');
	});
}

app.use('/api/users', userRoutes);
app.use('/api/boards', boardRoutes);

app.use((req, res, next) => {
	res.sendFile(path.resolve('public', 'index.html'));
});

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
	.connect(process.env.MONGODB_URI)
	.then(() => app.listen(process.env.PORT))
	.catch(err => console.log(err));
