const router = require('express').Router();
const { validateChangeUserInfo } = require('../validation/users');
const {
  getUser,
  changeUserInfo,
} = require('../controllers/users');

router.get('/me', getUser);

router.patch('/me', validateChangeUserInfo, changeUserInfo);

module.exports = router;
