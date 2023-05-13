const AgentSupplier = require('../models/agent_supplier')
const Technicien=require('../models/chef_Service')
const Equipment =require('../models/equipment')
const SparePart=require('../models/spare_part')
const BreakDown=require('../models/break_down')
const WorkOrder=require('../models/work_order')
const Maintenance = require('../models/maintenance')


exports.deleteAgentSupplier=(req,res)=>{
    id=req.params.id
    AgentSupplier.findByPk(id).then(agentSupplier =>{ 
     agentSupplier.destroy().then(res.redirect('/agentSupplier'))
     
 })
     .catch(err => console.log("ERROR!!!!!!",err) )
 
 
 }


 exports.deleteTechnicien=(req,res)=>{
    dssn=req.params.id
    Technicien.findByPk(dssn).then(technicien =>{ 
      technicien.destroy().then( res.redirect('/chefService'))
    
 })
    .catch(err => console.log("ERROR!!!!!!",err) )
 
 
 }


 exports.deleteEquipment=(req,res)=>{
    code=req.params.id
    Equipment.findByPk(code).then(equipment =>{ 
     equipment.destroy().then(res.redirect('/equipments'))
     
 })
    .catch(err => console.log("ERROR!!!!!!",err) )
 }

 exports.deleteSparePart=(req,res)=>{
    code=req.params.id
    SparePart.findByPk(code).then(sparepart=>{ 
    sparepart.destroy().then(res.redirect('/sparePart'))
        
 })
    .catch(err => console.log("ERROR!!!!!!",err) )
 }


 exports.deleteBreakDown=(req,res)=>{
    code=req.params.id
    BreakDown.findByPk(code).then(breakdown=>{ 
    console.log(code)
     breakdown.destroy().then(res.redirect('/breakDown'))
     
 })
    .catch(err => console.log("ERROR!!!!!!",err) )
 }
 exports.deletepanneChef=(req,res)=>{
   code=req.params.id
   BreakDown.findByPk(code).then(breakdown=>{ 
   console.log(code)
    breakdown.destroy().then(res.redirect('/technicien/panne'))
    
})
   .catch(err => console.log("ERROR!!!!!!",err) )
}

 exports.deleteWorkOrder=(req,res)=>{
    code=req.params.id
    WorkOrder.findByPk(code).then(workorder=>{ 
    console.log(code)
     workorder.destroy().then( res.redirect('/workOrder'))
    
 })
    .catch(err => console.log("ERROR!!!!!!",err) )
 }

 exports.deleteMaintenance=(req,res)=>{
   code=req.params.id
   Maintenance.findByPk(code).then(maintenance=>{ 
   console.log(code)
    maintenance.destroy().then( res.redirect('/maintenance'))
   
})
   .catch(err => console.log("ERROR!!!!!!",err) )
}

