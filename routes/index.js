const express = require('express');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { signIn, signOut, signUp } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateSignIn, validateSignUp } = require('../middlewares/validators');
const { NOT_FOUND_ERROR } = require('../utils/constants');
const NotFoundError = require('../errors/not-found-error');

const router = express.Router();

router.post('/signin', validateSignIn, signIn);
router.post('/signup', validateSignUp, signUp);

router.use(auth);

router.post('/signout', signOut);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use((request, response, next) => {
  next(new NotFoundError(NOT_FOUND_ERROR));
});

module.exports = router;
