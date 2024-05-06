const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');


const router = express.Router();

//SIGN UP - LOGIN
router.post('/signup', authController.signup);
router.post('/login', authController.login);


//GETTING USER DATA
router.get('/me', userController.getMe, userController.getUser);

// Adminstrator Features On User Protection
router.use(authController.restrictTo('teacher'));
router.route('/').get(userController.getAllUsers);
// .post(userController.createUser);


module.exports = router;
