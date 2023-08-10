const mongoose = require('mongoose');
const express = require('express');
const { errors } = require('celebrate');

const { PORT = 3002, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

mongoose.connect(DB_URL);

app.use(errors());

app.listen(PORT, () => {
  console.log('Hello, World');
});
