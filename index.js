const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const HttpError = require('./models/http-error');
const boardRoutes = require('./routes/board-routes');
const userRoutes = require('./routes/user-routes');
const env = process.env.NODE_ENV;

const app = require('express')();

app.use(bodyParser.json());
app.use(cors());

if (env === 'production') {
	app.use((require('express')).static(__dirname + '/client/build'));
}

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
	.connect(process.env.MONGODB_URI)
	.then(() => app.listen(process.env.PORT))
	.catch(err => console.log(err));
