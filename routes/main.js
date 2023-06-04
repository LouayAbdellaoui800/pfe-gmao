const DirName= require('../util/path');
const express = require('express');
const router = express.Router();
const homeController=require('../controllers/home')

const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

function checkUserRoleForTech(req, res, next) {
  if (req.user.role === 'user') {
    return res.render("403",{layout:false,href:'/',pageTitle:'401 Error'});
  } else {
    next();
  }
}
function checkUserRoleForChef(req, res, next) {
  if (req.user.role === 'Chef') {
    return res.render("403",{layout:false,href:'/',pageTitle:'401 Error'});
  } else {
    next();
  }
}
function checkUserRoleForAdmin(req, res, next) {
  if (req.user.role === 'admin') {
    return res.render("403",{layout:false,href:'/',pageTitle:'401 Error'});
  } else {
    next();
  }
}
function checkUserRoleForMag(req, res, next) {
  if (req.user.role === 'magazinier') {
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
};

router.get('/department',authMiddleware,checkUserRoleForTech,checkUserRoleForChef,checkUserRoleForMag,homeController.department);
router.get('/breakdown',authMiddleware,checkUserRoleForTech,checkUserRoleForMag,homeController.breakDown)
router.get('/equipment',authMiddleware,checkUserRoleForTech,checkUserRoleForMag,homeController.chefequipment)
router.get('/equipments',authMiddleware,checkUserRoleForTech,checkUserRoleForChef,homeController.equipment)
router.get('/workOrder',authMiddleware,checkUserRoleForTech,checkUserRoleForMag,homeController.workOrder)
router.get('/agentSupplier',authMiddleware,checkUserRoleForTech,homeController.agentSupplierChef)
router.get('/agentSuppliers',authMiddleware,checkUserRoleForTech,homeController.agentSupplier)

router.get('/sparePart',authMiddleware,checkUserRoleForTech,checkUserRoleForChef,homeController.sparePart)

router.get('/chefservice',authMiddleware,checkUserRoleForTech,checkUserRoleForChef,checkUserRoleForMag,homeController.chefService)
router.get('/technicien',authMiddleware,checkUserRoleForTech,checkUserRoleForMag,homeController.technicien)
router.get('/magazinier',authMiddleware,checkUserRoleForTech,checkUserRoleForChef,checkUserRoleForMag,homeController.magazinier)

router.get('/maintenance',authMiddleware,checkUserRoleForTech,checkUserRoleForMag,homeController.maintenance)
router.get('/installation',authMiddleware,checkUserRoleForTech,checkUserRoleForMag,homeController.installation)
router.get('/ppm',authMiddleware,checkUserRoleForTech,checkUserRoleForMag,homeController.ppm)
router.get('/dialyInspection',authMiddleware,checkUserRoleForTech,checkUserRoleForMag,homeController.dailyInspection)
router.get('/diagnostics',authMiddleware,checkUserRoleForTech,checkUserRoleForMag,homeController.diagnosticRep)
router.get('/home',authMiddleware,checkUserRoleForTech,checkUserRoleForMag,checkUserRoleForChef,checkUserRoleForMag,homeController.home)
router.get('/index',authMiddleware,checkUserRoleForTech,checkUserRoleForMag,homeController.index)
router.get('/technicien/dialyInspection',authMiddleware,checkUserRoleForChef,checkUserRoleForMag,homeController.dialyInspectionTech)
router.post('/technicien/dialyInspection',authMiddleware,checkUserRoleForChef,checkUserRoleForMag,homeController.dialyInspectionTechPost)
router.get('/technicien/ppm',authMiddleware,checkUserRoleForChef,checkUserRoleForMag,homeController.ppmTech)
router.get('/technicien/panne',authMiddleware,checkUserRoleForChef,checkUserRoleForMag,homeController.panneTech)
router.post('/technicien/ppm/equipment',authMiddleware,checkUserRoleForChef,checkUserRoleForMag,homeController.ppmTechPost)
router.post('/technicien/ppmEquipment/:Code',authMiddleware,checkUserRoleForChef,checkUserRoleForMag,homeController.ppmTechEquipmentPost)
router.get('/technicien/workOrder',authMiddleware,checkUserRoleForChef,checkUserRoleForMag,homeController.workorder)
router.get('/technicien/workOrder/description/:code',authMiddleware,checkUserRoleForChef,checkUserRoleForMag,homeController.workorderDescription)
router.get('/technicien/ppm/:code',authMiddleware,checkUserRoleForChef,checkUserRoleForMag,homeController.ppmTechEquipment)
router.post('/signIn',homeController.signIn);
router.get('/',homeController.homeSignIn);

router.get('/technicien/diagnostics',authMiddleware,checkUserRoleForChef,checkUserRoleForMag,homeController.diagnostic);
router.post('/technicien/diagnostics',authMiddleware,checkUserRoleForChef,checkUserRoleForMag,homeController.diagnosticPost)











module.exports=router;