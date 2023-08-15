require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const handleThen = require('../helpers/handlingThen');
const { SECRET_KEY, NODE_ENV } = require('../config');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => handleThen(user, res))
    .catch(next);
};

module.exports.changeUserInfo = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => handleThen(user, res, 202))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email: req.body.email,
        password: hash,
        name: req.body.name,
      })
        .then((user) => {
          handleThen(user, res, 201);
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.checkPassword(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET_KEY,
        { expiresIn: '7d' },
      );

      res.cookie('token', token, {
        httpOnly: false,
        maxAge: 604800000,
        secure: NODE_ENV === 'production',
        SameSite: 'none',
      });

      res.send(user);
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  res.clearCookie('token').send();
};
