function HttpError(message, errorCode) {
	this.message = message;
	this.errorCode = errorCode;
}

HttpError.prototype = Object.create(Error.prototype);
HttpError.prototype.constructor = HttpError;

module.exports = HttpError;
