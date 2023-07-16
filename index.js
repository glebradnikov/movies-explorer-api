const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies');
const auth = require('./middlewares/auth');
const errorHandling = require('./middlewares/error-handling');
const { PORT, URL } = require('./utils/constants');

const app = express();

mongoose.connect(URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(auth);
app.use('/users', usersRoutes);
app.use('/movies', moviesRoutes);
app.use(errorHandling);

app.listen(PORT);
