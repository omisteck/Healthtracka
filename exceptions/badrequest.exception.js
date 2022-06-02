const HttpError = require('./http.error');
const HttpStatusCode =  require('../config/statusCode');

const { BAD_REQUEST } = HttpStatusCode

class BadRequestException extends HttpError {
  constructor(message = 'Bad request', data = []) {
    super({
      message,
      statusCode: BAD_REQUEST,
      data
    });
  }
}

module.exports = BadRequestException;
