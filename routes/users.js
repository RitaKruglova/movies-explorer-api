const router = require('express').Router();
const { validateGetUser, validateChangeUserInfo } = require('../validation/users');
const { getUser, changeUserInfo } = require('../controllers/users');

router.get('/me', validateGetUser, getUser);

router.patch('/me', validateChangeUserInfo, changeUserInfo);

module.exports = router;
