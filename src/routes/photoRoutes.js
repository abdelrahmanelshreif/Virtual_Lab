const express = require('express');
const factory = require('../controllers/handlerFactory');
const router = express.Router();

// Get Photo
router.get('/:filename', factory.accessPhoto);

module.exports = router;
