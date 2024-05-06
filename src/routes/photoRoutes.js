const express = require('express');
const authController = require('../controllers/authController');
const photoController = require('../controllers/photoController');
const router = express.Router();


// Get Photo
router.get('/:filename',photoController.accessPhoto);
router.use(authController.protect);


//Only Teacher Can Upload The Photo
router.use(authController.restrictTo('teacher'));
// Upload Photo
router.post('/upload',photoController.uploadPhoto);


module.exports = router;