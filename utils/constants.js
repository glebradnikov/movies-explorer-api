const {
  PORT = 3000,
  URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  NODE_ENV,
  JWT,
} = process.env;

module.exports = { PORT, URL, NODE_ENV, JWT };

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
