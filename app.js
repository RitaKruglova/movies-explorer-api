const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const rateLimiter = require('./helpers/rateLimiter');
const { validateCreateUser, validateLogin } = require('./validation/auth');
const router = require('./routes/index');
const { createUser, login, logout } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { handleCatch } = require('./middlewares/handlingCatch');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { serverIsCrashing } = require('./constants/errorMessages');
const { checkDomain } = require('./middlewares/cors');
const { NotFoundError } = require('./helpers/errorClasses');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

mongoose.connect(DB_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(helmet());

app.use(rateLimiter);

app.use(checkDomain);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(serverIsCrashing);
  }, 0);
});

app.post('/signup', validateCreateUser, createUser);

app.post('/signin', validateLogin, login);

app.use(auth);

// app.use('/users', userRouter);
// app.use('/movies', movieRouter);
app.use('/', router);

app.use('/signout', logout);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger);
app.use(errors());
app.use(handleCatch);

app.listen(PORT, () => {
  console.log('Hello, World');
});
