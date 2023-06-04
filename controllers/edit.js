const AgentSupplier = require('../models/agent_supplier');
const Equipment =require('../models/equipment')
const SparePart =require('../models/spare_part');
const BreakDown =require('../models/break_down');
const WorkOrder =require('../models/work_order');
const Maintenance =require('../models/maintenance');
const ChefService=require('../models/chef_Service');
const Technicien=require('../models/technicien');
const Magazinier=require('../models/magazinier');




exports.editAgentSupplier=(req,res)=>{
    id=req.params.id
    AgentSupplier.findByPk(id).then(agentSupplier =>{ 
        const as = {
              Name: agentSupplier.Name,
              Id: agentSupplier.Id,
              Adress: agentSupplier.Adress,
              Phone:agentSupplier.Phone,
              Email:agentSupplier.Email,
              Notes:agentSupplier.Notes
            }
    
        
    res.render('editAgentSupplier',{layout:'MagazinierLayout.handlebars' ,pageTitle:'Edit',
                                     AS:true,agentSupplier:as});
 })
    .catch(err => res.render('error',{layout:false,pageTitle:'Error',href:'/agentSupplier',message:'Sorry !!! Could Not Get this Agent'}))
    
 
 
 }



exports.editChefService=(req,res) => {
    id=req.params.id
    ChefService.findOne({where:{ID:id},include:[{model:Department}]}).then(chefservice => { 
        const cs = {
              FName: chefservice.FName,
              LName: chefservice.LName,
              ID: chefservice.ID,
              Adress: chefservice.Adress,
              Phone:chefservice.Phone,
              Email:chefservice.Email,
              Age:chefservice.Age,
              Image:chefservice.Image,
              informatique:chefservice.Department.Name =='informatique' ? true : false,
          
              
            }
    
    console.log(cs)    
    res.render('editchefservice',{layout:'admin-layout.handlebars' ,pageTitle:'Edit',
                                     CE:true,chefService:cs});
 })
 .catch(err => 
   {
   console.log(err)
   res.render('error',{layout:false,pageTitle:'Error',href:'/agentSupplier',message:'Sorry !!! Could Not Get this Technicien'})
   })
 
 } 
 
exports.editTechnicien=(req,res) => {
   ID=req.params.id
   Technicien.findOne({where:{ID:ID},include:[{model:Department}]}).then(technicien => { 
       const cs = {
             FName: technicien.FName,
             LName: technicien.LName,
             ID: technicien.ID,
             Adress: technicien.Adress,
             Phone:technicien.Phone,
             WorkHours:technicien.WorkHours,
             Email:technicien.Email,
             Age:technicien.Age,
             Image:technicien.Image,
             informatique:technicien.Department.Name =='informatique' ? true : false,
             Mecanique:technicien.Department.Name =='Mecanique' ? true:false,
             Industrielle:technicien.Department.Name=='Industrielle' ? true:false,
             
           }
   
   console.log(cs)    
   res.render('editTechnicien',{layout:'ChefServiceLayout.handlebars' ,pageTitle:'Edit',
                                    TE:true,technicien:cs});
})
.catch(err => 
  {
  console.log(err)
  res.render('error',{layout:false,pageTitle:'Error',href:'/agentSupplier',message:'Sorry !!! Could Not Get this Technicien'})
  })

}

exports.editMagazinier=(req,res) => {
   id=req.params.id
   Magazinier.findOne({where:{ID:id},include:[{model:Department}]}).then(magazinier => { 
       const mg = {
             FName: magazinier.FName,
             LName: magazinier.LName,
             ID: magazinier.ID,
             Adress: magazinier.Adress,
             Phone:magazinier.Phone,
             Email:magazinier.Email,
             Age:magazinier.Age,
             Image:magazinier.Image,
             informatique:magazinier.Department.Name =='informatique',
           }
   res.render('editMagazinier',{layout:'admin-layout.handlebars' ,pageTitle:'Edit',
                                    MG:true,magazinier:mg});
})
.catch(err => 
  {
  console.log(err)
  res.render('error',{layout:false,pageTitle:'Error',href:'/agentSupplier',message:'Sorry !!! Could Not Get this Magazinier'})
  })

}

exports.editEquipment=(req,res)=>{
    code=req.params.id
    Equipment.findOne({where:{Code:code},include:[{model:Department}]}).then(equipment => {
        const eq = {
              Code: equipment.Code,
              Name: equipment.Name,
              Cost: equipment.Cost,
              InstallationDate: equipment.InstallationDate,
              WarrantyDate: equipment.WarrantyDate,
              ArrivalDate: equipment.InstallationDate,
              Model:equipment.Model,
              SerialNumber:equipment.SerialNumber,
              Manufacturer:equipment.Manufacturer,
              Notes:equipment.Notes,
              PM:equipment.PM,
              Image:equipment.Image,
              DepartmentCode:equipment.DepartmentCode,
              AgentSupplierId:equipment.AgentSupplierId,
              informatique:equipment.Department.Name =='informatique' ? true : false,
              Mecanique:equipment.Department.Name =='Mecanique' ? true:false,
              Industrielle:equipment.Department.Name=='Industrielle' ? true:false,
            }
     
   res.render('editEquipment',{layout:'MagazinierLayout.handlebars' ,pageTitle:'Edit',
                                      Equipment:true,equipment:eq});  
    
        
 })
    .catch(err => console.log("ERROR!!!!!!",err) )

 }



 exports.editSparePart=(req,res)=>{
   code=req.params.id
   SparePart.findByPk(code).then(sparePart =>{ 
       const sp = {
             Name: sparePart.Name,
             Code: sparePart.Code,
             SerialNumber:sparePart.SerialNumber,
             Image:sparePart.Image,
             AgentSupplierId:sparePart.AgentSupplierId,
             EquipmentCode:sparePart.EquipmentCode
           }
       
   res.render('editSparePart',{layout:'MagazinierLayout.handlebars' ,pageTitle:'Edit',
                                    SP:true,sparePart:sp});
})
   .catch(err => console.log("ERROR!!!!!!",err) )


}

exports.editBreakDown=(req,res)=>{
   code=req.params.id
   BreakDown.findByPk(code).then(breakDown =>{ 
       const bd = {
         Code:breakDown.Code,
         Reason:breakDown.Reason,
         DATE:breakDown.DATE,
         EquipmentCode:breakDown.EquipmentCode
           }
   
       
   res.render('editBreakDown',{layout:'ChefServiceLayout.handlebars' ,pageTitle:'Edit',
                                                   BreakDown:true,breakDown:bd});
})
   .catch(err => console.log("ERROR!!!!!!",err) )


}
exports.editPanneTech=(req,res)=>{
   code=req.params.id
   BreakDown.findByPk(code).then(breakDown =>{ 
       const bd = {
         Code:breakDown.Code,
         Reason:breakDown.Reason,
         DATE:breakDown.DATE,
         EquipmentCode:breakDown.EquipmentCode
           }
   
       
   res.render('editPanneChef',{layout:'TechnicienLayout' ,pageTitle:'Edit',
                                                   BreakDown:true,breakDown:bd});
})
   .catch(err => console.log("ERROR!!!!!!",err) )


}
exports.editWorkOrder=(req,res)=>{
   code = req.params.id
   WorkOrder.findByPk(code).then(workOrder=>{
      const wd = {
         Code:workOrder.Code,
         Cost:workOrder.Cost,
         StartDate:workOrder.StartDate,
         EndDate:workOrder.EndDate,
         Description:workOrder.Description,
         EquipmentCode:workOrder.EquipmentCode,
         Priority:workOrder.Priority,
         med:workOrder.Priority=='Medium'?true:false,
         high:workOrder.Priority=='High'?true:false,
         low:workOrder.Priority=='Low'?true:false,
         TechnicienID:workOrder.TechnicienID

      }

   res.render('editWorkOrder',{layout:'ChefServiceLayout.handlebars',pageTitle:'Edit',
                                       WO:true,workOrder:wd});



   })

     .catch(err=>console.log("errorrrrr",err))

}


exports.editMaintenance=(req,res)=>{
   id = req.params.id
   Maintenance.findByPk(id).then(maintenance=>{
      const m = {
         Id:maintenance.Id,
         StartDate:maintenance.StartDate,
         EndDate:maintenance.EndDate,
         BreakDownCode:maintenance.BreakDownCode,
         Description:maintenance.Description,
         TechnicienID:maintenance.TechnicienID
         
      }

   res.render('editMaintenance',{layout:'ChefServiceLayout.handlebars',pageTitle:'Edit',
                                       Maintenance:true,maintenance:m});



   })

     .catch(err=>console.log("errorrrrr",err))

}

