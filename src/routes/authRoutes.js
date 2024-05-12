const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

//SIGN UP - LOGIN
router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.use(authController.protect)
router.get('/user', authController.getMe,authController.getUser);

module.exports = router;
