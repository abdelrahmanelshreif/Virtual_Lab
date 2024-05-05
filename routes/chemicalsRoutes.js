const express = require('express');
const authController = require('../controllers/authController');
const handlerFactory = require('../controllers/handlerFactory');
const Chemical = require('../model/chemicalsModel');
const router = express.Router();

//Get All Chemicals
router.get('/',authController.restrictTo('teacher','student'), handlerFactory.getAll(Chemical));


//Add New Chemical
router.post('/add',authController.restrictTo('teacher'),handlerFactory.createOne(Chemical));

module.exports = router;
