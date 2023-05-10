const express = require('express');
const router = express.Router();
const deleteController=require('../controllers/delete')

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

router.get('/agentSupplier/delete/:id',deleteController.deleteAgentSupplier);
router.get('/technicien/delete/:id',deleteController.deleteTechnicien);
router.get('/equipment/delete/:id',deleteController.deleteEquipment);
router.get('/sparePart/delete/:id',deleteController.deleteSparePart);
router.get('/breakDown/delete/:id',deleteController.deleteBreakDown);
router.get('/technicien/panne/delete/:id',deleteController.deletepanneChef);
router.get('/workOrder/delete/:id',deleteController.deleteWorkOrder);
router.get('/maintenance/delete/:id',deleteController.deleteMaintenance);





module.exports=router;