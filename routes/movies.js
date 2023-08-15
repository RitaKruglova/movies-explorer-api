const router = require('express').Router();
const { validateCreateMovie, validateDeleteMovie } = require('../validation/movies');
const { getLikedMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getLikedMovies);

router.post('/', validateCreateMovie, createMovie);

router.delete('/:id', validateDeleteMovie, deleteMovie);

module.exports = router;
