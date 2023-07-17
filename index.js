require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const expressRateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { signIn, signOut, signUp } = require('./controllers/users');
const usersRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies');
const auth = require('./middlewares/auth');
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
app.use(requestLogger);

app.post('/signin', validateSignIn, signIn);
app.post('/signup', validateSignUp, signUp);

app.use(auth);

app.post('/signout', signOut);

app.use('/users', usersRoutes);
app.use('/movies', moviesRoutes);
app.use((request, response, next) => {
  next(new NotFoundError('Неправильный путь запрашиваемой страницы'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandling);

app.listen(PORT);
