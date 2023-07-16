const jsonwebtoken = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

module.exports = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer', '');
  let payload;

  try {
    payload = jsonwebtoken.verify(token, 'some-secret-key');
  } catch (error) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  request.user = payload;

  return next();
};
