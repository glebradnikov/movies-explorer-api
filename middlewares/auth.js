const jsonwebtoken = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

module.exports = (request, response, next) => {
  const { jwt } = request.cookies;

  if (!jwt) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jsonwebtoken.verify(jwt, 'some-secret-key');
  } catch (error) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  request.user = payload;

  return next();
};
