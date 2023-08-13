const mongoose = require('mongoose');
const { ConflictError, ValidationError, InternalServerError } = require('../helpers/errorClasses');

module.exports.handleCatch = (err, req, res, next) => {
  let verifiedError = err;

  if (err.code === 11000) {
    verifiedError = new ConflictError('Пользователь с таким email уже существует');
  }
  if (err instanceof mongoose.Error.ValidationError) {
    verifiedError = new ValidationError(err.message);
  }
  if (!verifiedError.statusCode) {
    verifiedError = new InternalServerError(`Произошла неизвестная ошибка на сервере: ${err}`);
  }

  res.status(verifiedError.statusCode).send({ messege: verifiedError.message });
};
