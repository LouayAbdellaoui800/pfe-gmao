const DirName= require('../util/path');
const express = require('express');
const router = express.Router();
const homeController=require('../controllers/home')

const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

/* function checkUserRole(req, res, next) {
  if (req.user.role === 'user') {
    return res.render("403",{layout:false,href:'/',pageTitle:'401 Error'});
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
}; */

router.get('/department',/* authMiddleware,checkUserRole, */homeController.department);
router.get('/breakdown',/* authMiddleware,checkUserRole, */homeController.breakDown)
router.get('/equipment',/* authMiddleware,checkUserRole, */homeController.chefequipment)
router.get('/equipments',/* authMiddleware,checkUserRole, */homeController.equipment)
router.get('/workOrder',/* authMiddleware,checkUserRole, */homeController.workOrder)
router.get('/agentSupplier',/* authMiddleware,checkUserRole, */homeController.agentSupplier)
router.get('/sparePart',/* authMiddleware,checkUserRole, */homeController.sparePart)

router.get('/chefservice',/* authMiddleware,checkUserRole, */homeController.chefService)
router.get('/technicien',/* authMiddleware,checkUserRole, */homeController.technicien)
router.get('/magazinier',/* authMiddleware,checkUserRole, */homeController.magazinier)

router.get('/maintenance',/* authMiddleware,checkUserRole, */homeController.maintenance)
router.get('/installation',/* authMiddleware,checkUserRole, */homeController.installation)
router.get('/ppm',/* authMiddleware,checkUserRole, */homeController.ppm)
router.get('/dialyInspection',/* authMiddleware,checkUserRole, */homeController.dailyInspection)
router.get('/home',/* authMiddleware,checkUserRole, */homeController.home)
router.get('/index',/* authMiddleware,checkUserRole, */homeController.index)
router.get('/technicien/dialyInspection'/* ,authMiddleware */,homeController.dialyInspectionTech)
router.post('/technicien/dialyInspection'/* ,authMiddleware */,homeController.dialyInspectionTechPost)
router.get('/technicien/ppm'/* ,authMiddleware */,homeController.ppmTech)
router.get('/technicien/panne'/* ,authMiddleware */,homeController.panneTech)
router.post('/technicien/ppm/equipment'/* ,authMiddleware */,homeController.ppmTechPost)
router.post('/technicien/ppmEquipment/:Code'/* ,authMiddleware */,homeController.ppmTechEquipmentPost)
router.get('/technicien/workOrder'/* ,authMiddleware */,homeController.workorder)
router.get('/technicien/workOrder/description/:code'/* ,authMiddleware */,homeController.workorderDescription)
router.get('/technicien/ppm/:code'/* ,authMiddleware */,homeController.ppmTechEquipment)
router.post('/signIn',homeController.signIn);
router.get('/',homeController.homeSignIn);










module.exports=router;