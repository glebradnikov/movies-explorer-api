const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');

module.exports.getUser = (request, response, next) => {
  const { _id } = request.user;

  User.findOne({ _id })
    .orFail(new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => {
      response.send({ user });
    })
    .catch(next);
};

module.exports.updateUser = (request, response, next) => {
  const { _id } = request.user;
  const { email, name } = request.body;

  User.findByIdAndUpdate(
    _id,
    { email, name },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(new NotFoundError('Пользователь с указанным _id не найден'))
    .then((user) => {
      response.send({ user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при обновлении профиля'
          )
        );

        return;
      }

      next(error);
    });
};
