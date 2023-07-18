const { INTERNAL_SERVER_ERROR } = require('../utils/constants');

module.exports = (error, request, response, next) => {
  const { statusCode = 500, message } = error;

  response
    .status(statusCode)
    .send({ message: statusCode === 500 ? INTERNAL_SERVER_ERROR : message });

  next();
};
