require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const expressRateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const cors = require('./middlewares/cors');
const errorHandling = require('./middlewares/error-handling');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, URL } = require('./utils/constants');

const limiter = expressRateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
const app = express();

mongoose.connect(URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(limiter);
app.use(cors);
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandling);

app.listen(PORT);
