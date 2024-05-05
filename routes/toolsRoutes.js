const express = require('express');
const authController = require('../controllers/authController');
const handlerFactory = require('../controllers/handlerFactory');
const Tools = require('../model/toolsModel');
const router = express.Router();

//Get All Tools
router.get('/',authController.restrictTo('student','teacher'), handlerFactory.getAll(Tools));

//Add New Tool
router.post('/add',authController.restrictTo('teacher'),handlerFactory.createOne(Tools));

module.exports = router;
