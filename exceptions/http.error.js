class HttpError extends Error {
  constructor({ message, statusCode, data = null }) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    
    Error.captureStackTrace(this, HttpError);

  }
}

module.exports = HttpError;