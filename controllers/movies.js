const { handleThen } = require('../helpers/handlingThen');
const Movie = require('../models/movie');
const { NotFoundError, ForbiddenError } = require('../helpers/errorClasses');

module.exports.getLikedMovies = (req, res, next) => {
  Movie.find({ owner: { $in: [req.user._id] } })
    .then((movies) => handleThen(movies, res))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
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
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => handleThen(movie, res, 201))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      if (!movie.owner.includes(req.user._id)) {
        throw new ForbiddenError('Невозможно удалить чужой фильм');
      }

      Movie.deleteOne(movie)
        .then(() => handleThen(movie, res))
        .catch(next);
    })
    .catch(next);
};
