const mongoose = require('mongoose');
const { wrongFormatUrl } = require('../constants/errorMessages');
const { urlRegex } = require('../constants/regexes');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => urlRegex.test(value),
      message: wrongFormatUrl,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (value) => urlRegex.test(value),
      message: wrongFormatUrl,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (value) => urlRegex.test(value),
      message: wrongFormatUrl,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});
movieSchema.index({ owner: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model('movie', movieSchema);
