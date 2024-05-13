const express = require('express');
const authController = require('../controllers/authController');
const factory = require('../controllers/handlerFactory');
const router = express.Router();

// Get Photo
// router.use(authController.protect);
router.get('/:filename', factory.accessPhoto);

module.exports = router;
