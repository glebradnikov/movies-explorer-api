const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { signIn, signOut, signUp } = require('./controllers/users');
const usersRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies');
const auth = require('./middlewares/auth');
const errorHandling = require('./middlewares/error-handling');
const { PORT, URL } = require('./utils/constants');

const app = express();

mongoose.connect(URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/signin', signIn);
app.post('/signup', signUp);

app.use(auth);

app.post('/signout', signOut);

app.use('/users', usersRoutes);
app.use('/movies', moviesRoutes);
app.use(errorHandling);

app.listen(PORT);
