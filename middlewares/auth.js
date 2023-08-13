require('dotenv').config();
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../helpers/errorClasses');
const { requiredAuthorization } = require('../constants/errorMessages');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  const { SECRET_KEY = 'secret-key' } = process.env;

  if (!token) {
    next(new UnauthorizedError(requiredAuthorization));
  }

  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch {
    next(new UnauthorizedError(requiredAuthorization));
  }

  req.user = payload;

  next();
};
