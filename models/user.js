const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { UnauthorizedError } = require('../helpers/errorClasses');
const { wrongEmail, wrongNameFormat, wrongLoginOrPassword } = require('../constants/errorMessages');
const { emailRegex, nameRegex } = require('../constants/regexes');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => emailRegex.test(value),
      message: wrongEmail,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (value) => nameRegex.test(value),
      message: wrongNameFormat,
    },
  },
});

userSchema.statics.checkPassword = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(wrongLoginOrPassword));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(wrongLoginOrPassword));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
