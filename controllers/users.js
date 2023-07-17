const jsonwebtoken = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { NODE_ENV, JWT } = require('../utils/constants');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');

module.exports.signIn = (request, response, next) => {
  const { email, password } = request.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jsonwebtoken.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT : 'dev-secret',
        {
          expiresIn: '7d',
        }
      );

      response.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      });

      response.send({ token });
    })
    .catch(next);
};

module.exports.signOut = (request, response, next) => {
  response
    .clearCookie('jwt')
    .status(200)
    .send({ message: 'JWT удалён из куков пользователя' });

  return next();
};

module.exports.signUp = (request, response, next) => {
  const { email, password, name } = request.body;

  bcryptjs.hash(password, 10).then((hash) => {
    User.create({
      email,
      password: hash,
      name,
    })
      .then((user) => {
        response.status(201).send({ user });
      })
      .catch((error) => {
        if (error.name === 'ValidationError') {
          return next(
            new BadRequestError(
              'Переданы некорректные данные при создании пользователя'
            )
          );
        }

        if (error.name === 'MongoServerError') {
          return next(
            new ConflictError(
              'При регистрации указан email, который уже существует на сервере'
            )
          );
        }

        return next(error);
      });
  });
};

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
        return next(
          new BadRequestError(
            'Переданы некорректные данные при обновлении профиля'
          )
        );
      }

      return next(error);
    });
};
