const express = require('express');
const authController = require('../controllers/authController');
const chemicalsController = require('../controllers/chemicalsController');
const router = express.Router();

router.use(authController.protect);

router.get('/', chemicalsController.getAllChemicals);
router.get('/:id', chemicalsController.getOneChemicals);

router.use(authController.restrictTo('teacher'));

router.post('/', chemicalsController.createNewChemical);
router
  .route('/:id')
  .patch(chemicalsController.updateChemical)
  .delete(chemicalsController.deleteChemical);

module.exports = router;
