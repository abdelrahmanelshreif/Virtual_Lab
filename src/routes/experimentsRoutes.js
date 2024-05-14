const express = require('express');
const authController = require('../controllers/authController');
const experimentController = require('../controllers/experimentsController');
const router = express.Router();

router.use(authController.protect);

router.get('/', experimentController.getAllExperiments);
router.get('/:id', experimentController.getOneExperiment);

router.use(authController.restrictTo('teacher'));

router.post(
  '/',
  experimentController.uploadExperimentPhoto,
  experimentController.createNewExperiment
);
router
  .route('/:id')
  .patch(
    experimentController.uploadExperimentPhoto,
    experimentController.updateExperiment
  )
  .delete(experimentController.deleteExperiment);

module.exports = router;
