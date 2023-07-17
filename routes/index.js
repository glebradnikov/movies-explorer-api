const express = require('express');
const { getUser, updateUser } = require('../controllers/users');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  validateUser,
  validateMovie,
  validateMovieId,
} = require('../middlewares/validators');

const router = express.Router();

router.get('/me', getUser);
router.patch('/me', validateUser, updateUser);

router.get('/', getMovies);
router.post('/', validateMovie, createMovie);
router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;
