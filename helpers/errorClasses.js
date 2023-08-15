const statusCodes = require('../constants/statusCodes');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.httpBadRequest;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.httpUnauthorized;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.httpForbidden;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.httpNotFound;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.httpConflict;
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.httpInternalServer;
  }
}

module.exports = {
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServerError,
};
