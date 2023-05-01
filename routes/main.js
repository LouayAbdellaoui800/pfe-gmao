const DirName= require('../util/path');
const express = require('express');
const router = express.Router();
const homeController=require('../controllers/home')

const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

function checkUserRole(req, res, next) {
  if (req.user.role === 'user') {
    res.status(403).send('Access denied');
  } else {
    next();
  }
}
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.render('401',{layout:false,href:'/',pageTitle:'401 Error'})

  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.redirect('/login');
  }
};

// app.get('/addDepartment',controller.addDepartment);
router.get('/department',authMiddleware,checkUserRole,homeController.department);
router.get('/breakdown',authMiddleware,homeController.breakDown)
router.get('/equipment',authMiddleware,homeController.equipment)
router.get('/workOrder',authMiddleware,homeController.workOrder)
router.get('/agentSupplier',authMiddleware,homeController.agentSupplier)
router.get('/sparePart',authMiddleware,homeController.sparePart)
router.get('/chefservice',authMiddleware,homeController.chefService)
router.get('/maintenance',authMiddleware,homeController.maintenance)
router.get('/installation',authMiddleware,homeController.installation)
router.get('/ppm',authMiddleware,homeController.ppm)
router.get('/dialyInspection',authMiddleware,homeController.dailyInspection)
router.get('/home',authMiddleware,homeController.home)
router.get('/chefservice/dialyInspection',authMiddleware,homeController.dialyInspectionChef)
router.post('/chefservice/dialyInspection',authMiddleware,homeController.dialyInspectionChefPost)
router.get('/chefservice/ppm',authMiddleware,homeController.ppmChef)
router.get('/chefservice/panne',authMiddleware,homeController.panneChef)
router.post('/chefservice/ppm/equipment',authMiddleware,homeController.ppmChefPost)
router.post('/chefservice/ppmEquipment/:Code',authMiddleware,homeController.ppmChefEquipmentPost)
router.get('/chefservice/workOrder',authMiddleware,homeController.workorder)
router.get('/chefservice/workOrder/description/:code',authMiddleware,homeController.workorderDescription)
router.get('/chefservice/ppm/:code',authMiddleware,homeController.ppmChefEquipment)
router.post('/signIn',homeController.signIn);
router.get('/',homeController.homeSignIn);










module.exports=router;