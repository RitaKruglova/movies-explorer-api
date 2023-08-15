const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const rateLimiter = require('./helpers/rateLimiter');
const router = require('./routes/index');
const { handleCatch } = require('./middlewares/handlingCatch');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { checkDomain } = require('./middlewares/cors');
const { PORT, DB_URL } = require('./config');

const app = express();

mongoose.connect(DB_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(helmet());

app.use(rateLimiter);

app.use(checkDomain);

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(handleCatch);

app.listen(PORT, () => {
  console.log('Hello, World');
});
