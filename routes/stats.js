const DirName= require('../util/path');
const express = require('express');
const router = express.Router();
const statsController=require('../controllers/stats')




// app.get('/addDepartment',controller.addDepartment);
router.get('/home',statsController.equipment);
module.exports=router;