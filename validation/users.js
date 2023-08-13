const { celebrate, Joi } = require('celebrate');

module.exports.validateGetUser = celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
  }).unknown(),
});

module.exports.validateChangeUserInfo = celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
  }).unknown(),
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2),
  }),
});
