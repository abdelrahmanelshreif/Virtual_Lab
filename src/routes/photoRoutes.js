const express = require('express');
const photoController = require('../controllers/photoController');
const handlerFactory = require('../controllers/handlerFactory');
const router = express.Router();


router.get('/:filename',handlerFactory.accessPhoto);

router
  .route('/v2/:id')
  .get(photoController.accessPhoto)
  .delete(photoController.deletePhoto);
router
  .route('/v2')
  .post(photoController.createPhoto)
  .get(photoController.getAllPhotos);

module.exports = router;
