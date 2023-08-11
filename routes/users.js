const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, changeUserInfo } = require('../controllers/users');

router.get('/me', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
  }).unknown(),
}), getUser);

router.patch('/me', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
  }).unknown(),
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2),
  }),
}), changeUserInfo);

module.exports = router;
