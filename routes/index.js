const express = require('express');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { serverIsCrashing } = require('../constants/errorMessages');
const { validateCreateUser, validateLogin } = require('../validation/auth');
const {
  createUser,
  login,
  logout,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

const { NotFoundError } = require('../helpers/errorClasses');

const router = express.Router();

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(serverIsCrashing);
  }, 0);
});

router.post('/signup', validateCreateUser, createUser);

router.post('/signin', validateLogin, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('/signout', logout);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;
