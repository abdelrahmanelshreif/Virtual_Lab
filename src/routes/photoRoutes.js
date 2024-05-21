const express = require('express');
const photoController = require('../controllers/photoController');
const router = express.Router();

router
  .route('/:id')
  .get(photoController.accessPhoto)
  .delete(photoController.deletePhoto);
router
  .route('/')
  .post(photoController.createPhoto)
  .get(photoController.getAllPhotos);

module.exports = router;
