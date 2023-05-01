const express = require('express');
const router = express.Router();
const editController=require('../controllers/edit')

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

router.get('/agentSupplier/edit/:id',authMiddleware,checkUserRole,editController.editAgentSupplier);
router.get('/chefservice/edit/:id',authMiddleware,checkUserRole,editController.editChefService);
router.get('/equipment/edit/:id',authMiddleware,checkUserRole,editController.editEquipment);
router.get('/sparePart/edit/:id',authMiddleware,checkUserRole,editController.editSparePart);
router.get('/breakDown/edit/:id',authMiddleware,checkUserRole,editController.editBreakDown);
router.get('/chefservice/panne/edit/:id',authMiddleware,checkUserRole,editController.editPanneChef);
router.get('/workOrder/edit/:id',authMiddleware,checkUserRole,editController.editWorkOrder);
router.get('/maintenance/edit/:id',authMiddleware,checkUserRole,editController.editMaintenance);








module.exports=router;