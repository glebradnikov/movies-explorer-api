const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized-error');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: [true, 'Поле "email" должно быть уникальным'],
      required: [true, 'Поле "email" должно быть заполнено'],
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Некорректный почта',
      },
    },
    password: {
      type: String,
      select: false,
      required: [true, 'Поле "email" должно быть заполнено'],
      validate: {
        validator: (password) => validator.isStrongPassword(password),
        message: 'Некорректный пароль',
      },
    },
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
      required: [true, 'Поле "name" должно быть заполнено'],
    },
  },
  {
    versionKey: false,
    statics: {
      findUserByCredentials(email, password) {
        return this.findOne({ email })
          .select('+password')
          .then((user) => {
            if (!user) {
              return Promise.reject(
                new UnauthorizedError('Неправильные почта или пароль')
              );
            }

            return bcryptjs.compare(password, user.password).then((matched) => {
              if (!matched) {
                return Promise.reject(
                  new UnauthorizedError('Неправильные почта или пароль')
                );
              }

              return user;
            });
          });
      },
    },
  }
);

module.exports = mongoose.model('user', userSchema);
