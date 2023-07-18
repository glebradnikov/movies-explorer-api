const Movie = require('../models/movie');
const {
  BAD_REQUEST_CREATE_MOVIE,
  NOT_FOUND_ERROR_DELETE_MOVIE,
  FORBIDDEN_ERROR_DELETE_MOVIE,
  BAD_REQUEST_DELETE_MOVIE,
} = require('../utils/constants');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');

module.exports.getMovies = (request, response, next) => {
  const owner = request.user._id;

  Movie.find({ owner })
    .then((movies) => {
      response.send({ movies });
    })
    .catch(next);
};

module.exports.createMovie = (request, response, next) => {
  const { _id } = request.user;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = request.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: _id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      response.status(201).send({ movie });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new BadRequestError(BAD_REQUEST_CREATE_MOVIE));
      }

      return next(error);
    });
};

module.exports.deleteMovie = (request, response, next) => {
  const { _id } = request.user;
  const { movieId } = request.params;

  Movie.findById(movieId)
    .orFail(new NotFoundError(NOT_FOUND_ERROR_DELETE_MOVIE))
    .then((movie) => {
      if (movie.owner.valueOf() !== _id) {
        return next(new ForbiddenError(FORBIDDEN_ERROR_DELETE_MOVIE));
      }

      return Movie.deleteOne()
        .then(() => {
          response.send({ movie });
        })
        .catch(next);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new BadRequestError(BAD_REQUEST_DELETE_MOVIE));
      }

      return next(error);
    });
};
