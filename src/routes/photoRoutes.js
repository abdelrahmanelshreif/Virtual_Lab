const express = require('express');
const authController = require('../controllers/authController');
const photoController = require('../controllers/photoController');
const router = express.Router();

router.use(authController.protect);


router.use(authController.restrictTo('teacher'));


// Upload Photo
router.post('/upload',photoController.uploadPhoto);

// Get Photo
router.get('/:filename',photoController.accessPhoto);

module.exports = router;