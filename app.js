const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { validateCreateUser, validateLogin } = require('./validation/auth');
// const userRouter = require('./routes/users');
// const movieRouter = require('./routes/movies');
const router = require('./routes/index');
const { createUser, login, logout } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { handleCatch } = require('./middlewares/handlingCatch');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

mongoose.connect(DB_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(helmet());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
}));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateCreateUser, createUser);

app.post('/signin', validateLogin, login);

app.use(auth);

// app.use('/users', userRouter);
// app.use('/movies', movieRouter);
app.use('/', router);

app.use('/signout', logout);

app.use(errorLogger);
app.use(errors());
app.use(handleCatch);

app.listen(PORT, () => {
  console.log('Hello, World');
});
