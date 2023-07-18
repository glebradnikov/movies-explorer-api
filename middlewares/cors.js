const { ALLOWED_CORS, DEFAULT_ALLOWED_METHODS } = require('../utils/constants');

module.exports = (requset, response, next) => {
  const { method } = requset;
  const { origin } = requset.headers;
  const requestHeaders = requset.headers['access-control-request-headers'];

  if (ALLOWED_CORS.includes(origin)) {
    response.header('Access-Control-Allow-Origin', origin);
    response.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    response.header('Access-Control-Allow-Headers', requestHeaders);
    response.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);

    return response.end();
  }

  return next();
};
