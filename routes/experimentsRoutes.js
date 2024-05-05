const express = require('express');
const authController = require('../controllers/authController');
const experimentController = require('../controllers/experimentsController');
const router = express.Router();

router.use(authController.protect);

router.get('/', experimentController.getAllExperiments);

router.use(authController.restrictTo('teacher'));

router
  .route('/')
  .post(
    experimentController.uploadExperimentPhoto,
    experimentController.createNewExperiment
  )
  .patch(experimentController.updateExperiment)
  .delete(experimentController.deleteExperiment);

module.exports = router;
