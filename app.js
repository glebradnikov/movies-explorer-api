require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const expressRateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { signIn, signOut, signUp } = require('./controllers/users');
const routes = require('./routes/index');
const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const errorHandling = require('./middlewares/error-handling');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateSignIn, validateSignUp } = require('./middlewares/validators');
const { PORT, URL } = require('./utils/constants');
const NotFoundError = require('./errors/not-found-error');

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

app.post('/signin', validateSignIn, signIn);
app.post('/signup', validateSignUp, signUp);

app.use(auth);

app.post('/signout', signOut);

app.use('/users', routes);
app.use('/movies', routes);
app.use((request, response, next) => {
  next(new NotFoundError('Неправильный путь запрашиваемой страницы'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandling);

app.listen(PORT);
