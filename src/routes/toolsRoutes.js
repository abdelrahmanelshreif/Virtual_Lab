const express = require('express');
const authController = require('../controllers/authController');
const toolsController = require('../controllers/toolsController');
const router = express.Router();

router.use(authController.protect);

router.get('/', toolsController.getAllTools);
router.get('/:id', toolsController.getOneTools);

router.use(authController.restrictTo('teacher'));

router.post(
  '/',
  toolsController.uploadToolPhoto,
  toolsController.createNewTool
);
router
  .route('/:id')
  .patch(toolsController.uploadToolPhoto, toolsController.updateTool)
  .delete(toolsController.deleteTool);

module.exports = router;
