const express = require('express');
const router = express.Router();
const reportController=require('../controllers/report')

const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

function checkUserRole(req, res, next) {
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
};

router.get('/report/department/equipments/:code',reportController.departmentEquipmentsReport);
router.get('/report/department/chefserice/:code',reportController.departmentTechnicienReport);
router.get('/report/agent/spareParts/:Id',reportController.agentSparePartsReport);
router.get('/report/agent/equipments/:Id',reportController.agentEquipmentsReport);
router.get('/report/equipment/installation/:Id',reportController.equipmentInstallationReport);
router.get('/report/equipment/dailyInspection/:Id',reportController.equipmentDialyInspectionReport);
router.get('/report/dialyInspection/:code',reportController.dialyInspectionReport);
router.get('/report/equipment/ppm/:Id',reportController.equipmentPpmReport);
router.get('/report/equipment/breakDowns/:Id',reportController.equipmentBreakDownReport);
router.get('/report/equipment/maintenance/:Id',reportController.equipmentMaintenaceReport);
router.get('/report/equipment/spareParts/:Id',reportController.equipmentSparePartsReport);
router.get('/report/ppm/:code',reportController.PpmReport);
router.get('/report/diagnosticsReport/:code',reportController.diagnosticsReport);

module.exports=router;