const express = require('express');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { validateMovie, validateMovieId } = require('../middlewares/validators');

const router = express.Router();

router.get('/', getMovies);
router.post('/', validateMovie, createMovie);
router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;
