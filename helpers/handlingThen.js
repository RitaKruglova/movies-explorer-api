const handleThen = (data, res, statusCode = 200) => {
  if (data === null) {
    res.status(404).send({ message: 'Не найдено' });
  } else {
    res.set({
      'Content-Security-Policy': 'default-src "self"',
    })
      .status(statusCode).send(data);
  }
};

module.exports = handleThen;
