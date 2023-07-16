const Movie = require('../models/movie');
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
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании фильма'
          )
        );
        return;
      }

      next(error);
    });
};

module.exports.deleteMovie = (request, response, next) => {
  const { _id } = request.user;
  const { movieId } = request.params;

  Movie.findById(movieId)
    .orFail(new NotFoundError('Фильм с указанным _id не найден'))
    .then((movie) => {
      if (movie.owner.valueOf() !== _id) {
        next(new ForbiddenError('Попытка удалить чужой фильм'));
        return;
      }

      Movie.deleteOne()
        .then(() => {
          response.send({ movie });
        })
        .catch(next);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(
          new BadRequestError('Переданы некорректные данные для удалении фильм')
        );
        return;
      }

      next(error);
    });
};
