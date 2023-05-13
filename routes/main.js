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
router.get('/breakdown',authMiddleware,checkUserRoleForTech,checkUserRoleForAdmin,checkUserRoleForMag,homeController.breakDown)
router.get('/equipment',authMiddleware,checkUserRoleForTech,checkUserRoleForAdmin,checkUserRoleForMag,homeController.chefequipment)
router.get('/equipments',authMiddleware,checkUserRoleForTech,checkUserRoleForChef,homeController.equipment)
router.get('/workOrder',authMiddleware,checkUserRoleForTech,checkUserRoleForAdmin,checkUserRoleForMag,homeController.workOrder)
router.get('/agentSupplier',authMiddleware,checkUserRoleForTech,checkUserRoleForChef,checkUserRoleForAdmin,homeController.agentSupplier)
router.get('/sparePart',authMiddleware,checkUserRoleForTech,checkUserRoleForChef,checkUserRoleForAdmin,homeController.sparePart)

router.get('/chefservice',authMiddleware,checkUserRoleForTech,checkUserRoleForChef,checkUserRoleForMag,homeController.chefService)
router.get('/technicien',authMiddleware,checkUserRoleForTech,checkUserRoleForMag,homeController.technicien)
router.get('/magazinier',authMiddleware,checkUserRoleForTech,checkUserRoleForChef,checkUserRoleForMag,homeController.magazinier)

router.get('/maintenance',authMiddleware,checkUserRoleForTech,checkUserRoleForAdmin,checkUserRoleForMag,homeController.maintenance)
router.get('/installation',authMiddleware,checkUserRoleForTech,checkUserRoleForAdmin,checkUserRoleForMag,homeController.installation)
router.get('/ppm',authMiddleware,checkUserRoleForTech,checkUserRoleForAdmin,checkUserRoleForMag,homeController.ppm)
router.get('/dialyInspection',authMiddleware,checkUserRoleForTech,checkUserRoleForAdmin,checkUserRoleForMag,homeController.dailyInspection)
router.get('/diagnostics',authMiddleware,checkUserRoleForTech,checkUserRoleForAdmin,checkUserRoleForMag,homeController.diagnosticRep)
router.get('/home',authMiddleware,checkUserRoleForTech,checkUserRoleForMag,checkUserRoleForChef,checkUserRoleForMag,homeController.home)
router.get('/index',authMiddleware,checkUserRoleForTech,checkUserRoleForAdmin,checkUserRoleForMag,homeController.index)
router.get('/technicien/dialyInspection',authMiddleware,checkUserRoleForChef,checkUserRoleForMag,checkUserRoleForAdmin,homeController.dialyInspectionTech)
router.post('/technicien/dialyInspection',authMiddleware,checkUserRoleForChef,checkUserRoleForMag,checkUserRoleForAdmin,homeController.dialyInspectionTechPost)
router.get('/technicien/ppm',authMiddleware,checkUserRoleForChef,checkUserRoleForMag,checkUserRoleForAdmin,homeController.ppmTech)
router.get('/technicien/panne',authMiddleware,checkUserRoleForChef,checkUserRoleForMag,checkUserRoleForAdmin,homeController.panneTech)
router.post('/technicien/ppm/equipment',authMiddleware,checkUserRoleForChef,checkUserRoleForMag,checkUserRoleForAdmin,homeController.ppmTechPost)
router.post('/technicien/ppmEquipment/:Code',authMiddleware,checkUserRoleForChef,checkUserRoleForMag,checkUserRoleForAdmin,homeController.ppmTechEquipmentPost)
router.get('/technicien/workOrder',authMiddleware,checkUserRoleForChef,checkUserRoleForMag,checkUserRoleForAdmin,homeController.workorder)
router.get('/technicien/workOrder/description/:code',authMiddleware,checkUserRoleForChef,checkUserRoleForMag,checkUserRoleForAdmin,homeController.workorderDescription)
router.get('/technicien/ppm/:code',authMiddleware,checkUserRoleForChef,checkUserRoleForMag,checkUserRoleForAdmin,homeController.ppmTechEquipment)
router.post('/signIn',homeController.signIn);
router.get('/',homeController.homeSignIn);

router.get('/technicien/diagnostics',authMiddleware,checkUserRoleForChef,checkUserRoleForMag,checkUserRoleForAdmin,homeController.diagnostic);
router.post('/technicien/diagnostics',authMiddleware,checkUserRoleForChef,checkUserRoleForMag,checkUserRoleForAdmin,homeController.diagnosticPost)











module.exports=router;