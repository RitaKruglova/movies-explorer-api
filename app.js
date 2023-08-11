const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const userRouter = require('./routes/users');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3002, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

mongoose.connect(DB_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
  }).unknown(),
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

app.post('/signin', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
  }).unknown(),
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.use(auth);

app.use('/users', userRouter);

app.use(errors());

app.listen(PORT, () => {
  console.log('Hello, World');
});
