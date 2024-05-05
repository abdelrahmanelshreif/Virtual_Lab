const express = require('express');
const authController = require('../controllers/authController');
const toolsController = require('../controllers/toolsController');
const router = express.Router();

router.use(authController.protect);

router.get('/', toolsController.getAllTools);

router.use(authController.restrictTo('teacher'));

router
  .route('/')
  .post(toolsController.createNewTool)
  .patch(toolsController.updateTool)
  .delete(toolsController.deleteTool);

module.exports = router;
