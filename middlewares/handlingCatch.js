const mongoose = require('mongoose');
const { ConflictError, ValidationError, InternalServerError } = require('../helpers/errorClasses');
const { emailAlreadyUsed, unexpectedError } = require('../constants/errorMessages');

module.exports.handleCatch = (err, req, res, next) => {
  let verifiedError = err;

  if (err.code === 11000) {
    verifiedError = new ConflictError(emailAlreadyUsed);
  }
  if (err instanceof mongoose.Error.ValidationError) {
    verifiedError = new ValidationError(err.message);
  }
  if (!verifiedError.statusCode) {
    verifiedError = new InternalServerError(unexpectedError);
  }

  res.status(verifiedError.statusCode).send({ messege: verifiedError.message });
};
