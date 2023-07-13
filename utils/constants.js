const { PORT = 3000, URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } =
  process.env;

module.exports = { PORT, URL };
