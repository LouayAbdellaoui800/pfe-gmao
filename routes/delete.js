const express = require('express');
const router = express.Router();
const deleteController=require('../controllers/delete')

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

router.get('/agentSupplier/delete/:id',authMiddleware,checkUserRoleForMag,deleteController.deleteAgentSupplier);
router.get('/technicien/delete/:id',authMiddleware,deleteController.deleteTechnicien);
router.get('/chefservice/delete/:id',authMiddleware,deleteController.deleteChef);
router.get('/magazinier/delete/:id',authMiddleware,deleteController.deleteMag);

router.get('/equipment/delete/:id',authMiddleware,deleteController.deleteEquipment);
router.get('/sparePart/delete/:id',authMiddleware,deleteController.deleteSparePart);
router.get('/breakDown/delete/:id',authMiddleware,deleteController.deleteBreakDown);
router.get('/technicien/panne/delete/:id',authMiddleware,deleteController.deletepanneChef);
router.get('/workOrder/delete/:id',authMiddleware,deleteController.deleteWorkOrder);
router.get('/maintenance/delete/:id',authMiddleware,deleteController.deleteMaintenance);





module.exports=router;