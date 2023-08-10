const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { UnauthorizedError } = require('../helpers/errorClasses');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        const emailRegex = /\w+@\w+\.\w+/;
        return emailRegex.test(value);
      },
      message: 'Передан неверный email',
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
      validator: (value) => {
        const nameRegex = /^[a-zA-Zа-яА-ЯёЁ]{2,30}$/;
        return nameRegex.test(value);
      },
      message: 'Имя должно содержать только буквы Английского алфавита или Кириллицы',
    },
  },
});

userSchema.statics.checkPassword = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Вы ввели неправильный логин или пароль.'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Вы ввели неправильный логин или пароль.'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
