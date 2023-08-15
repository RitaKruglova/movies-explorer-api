const { celebrate, Joi } = require('celebrate');

module.exports.validateChangeUserInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2),
  }),
});
