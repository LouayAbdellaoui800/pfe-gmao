const AgentSupplier = require('../models/agent_supplier');
const Equipment =require('../models/equipment')
const SparePart =require('../models/spare_part');
const BreakDown =require('../models/break_down');
const WorkOrder =require('../models/work_order');
const Maintenance =require('../models/maintenance');
const Technicien=require('../models/chef_Service')




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
    
        
    res.render('editAgentSupplier',{layout:'main-layout.handlebars' ,pageTitle:'Edit',
                                     AS:true,agentSupplier:as});
 })
    .catch(err => res.render('error',{layout:false,pageTitle:'Error',href:'/agentSupplier',message:'Sorry !!! Could Not Get this Agent'}))
    
 
 
 }



exports.editChefService=(req,res) => {
    ID=req.params.id
    Technicien.findOne({where:{ID:ID},include:[{model:Department}]}).then(chefservice => { 
        const cs = {
              FName: chefservice.FName,
              LName: chefservice.LName,
              ID: chefservice.ID,
              Adress: chefservice.Adress,
              Phone:chefservice.Phone,
              WorkHours:chefservice.WorkHours,
              Email:chefservice.Email,
              Age:chefservice.Age,
              Image:chefservice.Image,
              informatique:chefservice.Department.Name =='informatique' ? true : false,
              Mecanique:chefservice.Department.Name =='Mecanique' ? true:false,
              Industrielle:chefservice.Department.Name=='Industrielle' ? true:false,
              
            }
    
    console.log(cs)    
    res.render('editchefservice',{layout:'main-layout.handlebars' ,pageTitle:'Edit',
                                     CE:true,chefService:cs});
 })
 .catch(err => 
   {
   console.log(err)
   res.render('error',{layout:false,pageTitle:'Error',href:'/agentSupplier',message:'Sorry !!! Could Not Get this Technicien'})
   })
 
 } 
 




exports.editEquipment=(req,res)=>{
    code=req.params.id
    console.log("here")
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
              Location:equipment.Location,
              Notes:equipment.Notes,
              PM:equipment.PM,
              Image:equipment.Image,
              DepartmentCode:equipment.DepartmentCode,
              AgentSupplierId:equipment.AgentSupplierId,
              informatique:equipment.Department.Name =='informatique' ? true : false,
              Mecanique:equipment.Department.Name =='Mecanique' ? true:false,
              Industrielle:equipment.Department.Name=='Industrielle' ? true:false,
            }
   if(eq.PM =="Annualy"){
      res.render('editEquipment',{layout:'main-layout.handlebars' ,pageTitle:'Edit',
                                       Equipment:true,equipment:eq,A:true});

   }else{
      res.render('editEquipment',{layout:'main-layout.handlebars' ,pageTitle:'Edit',
            Equipment:true,equipment:eq,M:true});
   }     
   res.render('editEquipment',{layout:'main-layout.handlebars' ,pageTitle:'Edit',
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
             Amount:sparePart.Amount,
             Image:sparePart.Image,
             AgentSupplierId:sparePart.AgentSupplierId,
             EquipmentCode:sparePart.EquipmentCode
           }
       
   res.render('editSparePart',{layout:'main-layout.handlebars' ,pageTitle:'Edit',
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
   
       
   res.render('editBreakDown',{layout:'main-layout.handlebars' ,pageTitle:'Edit',
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

   res.render('editWorkOrder',{layout:'main-layout.handlebars',pageTitle:'Edit',
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

   res.render('editMaintenance',{layout:'main-layout.handlebars',pageTitle:'Edit',
                                       Maintenance:true,maintenance:m});



   })

     .catch(err=>console.log("errorrrrr",err))

}