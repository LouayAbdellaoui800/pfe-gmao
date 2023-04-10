const DirName= require('../util/path');
const express = require('express');
const router = express.Router();
const homeController=require('../controllers/home')




// app.get('/addDepartment',controller.addDepartment);
router.get('/department',homeController.department);
router.get('/breakdown',homeController.breakDown)
router.get('/equipment',homeController.equipment)
router.get('/workOrder',homeController.workOrder)
router.get('/agentSupplier',homeController.agentSupplier)
router.get('/sparePart',homeController.sparePart)
router.get('/chefservice',homeController.chefService)
router.get('/maintenance',homeController.maintenance)
router.get('/installation',homeController.installation)
router.get('/ppm',homeController.ppm)
router.get('/dialyInspection',homeController.dailyInspection)
router.get('/home',homeController.home)
router.get('/chefservice/dialyInspection',homeController.dialyInspectionChef)
router.post('/chefservice/dialyInspection',homeController.dialyInspectionChefPost)
router.get('/chefservice/ppm',homeController.ppmChef)
router.post('/chefservice/ppm/equipment',homeController.ppmChefPost)
router.post('/chefservice/ppmEquipment/:Code',homeController.ppmChefEquipmentPost)
router.get('/chefservice/workOrder',homeController.workorder)
router.get('/chefservice/workOrder/description/:code',homeController.workorderDescription)
router.get('/chefservice/ppm/:code',homeController.ppmChefEquipment)
router.post('/signIn',homeController.signIn);
router.get('/',homeController.homeSignIn);










module.exports=router;