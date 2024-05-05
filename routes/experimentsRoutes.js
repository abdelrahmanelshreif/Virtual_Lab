const express = require('express');
const authController = require('../controllers/authController');
const handlerFactory = require('../controllers/handlerFactory');
const Experiments = require('../model/experimentModel');
const router = express.Router();

//Get All Experiments 
router.get('/', authController.restrictTo('student','teacher'),handlerFactory.getAll(Experiments));

//Add New Experiment 
router.post('/add',authController.restrictTo('teacher'),handlerFactory.createOne(Experiments));


module.exports = router;
