const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../helpers/errorClasses');
const { requiredAuthorization } = require('../constants/errorMessages');
const { SECRET_KEY } = require('../config');

module.exports = (req, res, next) => {
  const { token } = req.cookies;

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
