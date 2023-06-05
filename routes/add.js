const express = require('express');
const router = express.Router();
const addController=require('../controllers/add')
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
    return res.redirect("/403.html");
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

router.post('/department/add',/* authMiddleware *//* ,checkUserRole, */addController.addDepartment)
router.post('/agentSupplier/add',authMiddleware,checkUserRoleForMag,addController.addAgentSupplier)
router.post('/chefService/add',/* authMiddleware *//* ,checkUserRole, */addController.addChefService)
router.post('/technicien/add',/* authMiddleware *//* ,checkUserRole, */addController.addTechnicien)
router.post('/magazinier/add',/* authMiddleware *//* ,checkUserRole, */addController.addMagazinier)

router.post('/equipment/add',/* authMiddleware *//* ,checkUserRole, */addController.addEquipment)
router.post('/sparePart/add',/* authMiddleware *//* ,checkUserRole, */addController.addSpareParts)
router.post('/breakDown/add',/* authMiddleware *//* ,checkUserRole, */addController.addBreakDown)
router.post('/technicien/panne/add',/* authMiddleware *//* ,checkUserRole, */addController.addPanneTech)
router.post('/workOrder/add',/* authMiddleware *//* ,checkUserRole, */addController.addWorkOrder)
router.post('/maintenance/add',/* authMiddleware *//* ,checkUserRole, */addController.addMaintenance)
router.post('/Etat/add',/* authMiddleware *//* ,checkUserRole, */addController.workorderEtat)
router.post('/equipments/add',/* authMiddleware *//* ,checkUserRole, */addController.addEquipmentMG)

module.exports=router;