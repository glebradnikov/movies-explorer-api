const {
  NODE_ENV,
  JWT,
  PORT = 3000,
  URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

module.exports = { NODE_ENV, JWT, PORT, URL };

module.exports.URL_REGEX =
  // eslint-disable-next-line no-useless-escape
  /https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[\w\-.~:\/?#[\]@!$&'()*+,;=]+/;

module.exports.ALLOWED_CORS = [
  'http://movie-explorer.nomoredomains.xyz',
  'https://movie-explorer.nomoredomains.xyz',
  'http://api.movie-explorer.nomoredomains.xyz',
  'https://api.movie-explorer.nomoredomains.xyz',
  'http://localhost:3000',
  'https://localhost:3000',
];

module.exports.DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports.NOT_FOUND_ERROR = 'Неправильный путь запрашиваемой страницы';

module.exports.INTERNAL_SERVER_ERROR = 'Ошибка по умолчанию';

module.exports.RESPONSE_SIGN_OUT = 'JWT удалён из куков пользователя';
module.exports.BAD_REQUEST_SIGN_UP =
  'Переданы некорректные данные при создании пользователя';
module.exports.CONFLICT_ERROR_SIGN_UP =
  'При регистрации указан email, который уже существует на сервере';
module.exports.NOT_FOUND_ERROR_GET_USER =
  'Пользователь по указанному _id не найден';
module.exports.NOT_FOUND_ERROR_UPDATE_USER =
  'Пользователь с указанным _id не найден';
module.exports.BAD_REQUEST_UPDATE_USER =
  'Переданы некорректные данные при обновлении профиля';
module.exports.CONFLICT_ERROR_UPDATE_USER =
  'При обновлении информации о пользователе указан email, который уже существует на сервере';

module.exports.BAD_REQUEST_CREATE_MOVIE =
  'Переданы некорректные данные при создании фильма';
module.exports.NOT_FOUND_ERROR_DELETE_MOVIE = 'Фильм с указанным _id не найден';
module.exports.FORBIDDEN_ERROR_DELETE_MOVIE = 'Попытка удалить чужой фильм';
module.exports.BAD_REQUEST_DELETE_MOVIE =
  'Переданы некорректные данные для удалении фильм';
