const { notFound } = require('../constants/errorMessages');
const { httpOk, httpNotFound } = require('../constants/statusCodes');

const handleThen = (data, res, statusCode = httpOk) => {
  if (data === null) {
    res.status(httpNotFound).send({ message: notFound });
  } else {
    res.set({
      'Content-Security-Policy': 'default-src "self"',
    })
      .status(statusCode).send(data);
  }
};

module.exports = handleThen;
