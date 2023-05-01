const Technicien=require('../models/chef_Service');
const AgentSupplier=require('../models/agent_supplier');
const Equipment =require('../models/equipment');
const Department =require('../models/department');

exports.equipment=(req,res)=>{
    Equipment.findAll({
        include:[{model:Department},{model:AgentSupplier}]
        }).then(equipments => {
        const eq = equipments.map(equipment => {
                  return {
                    Code: equipment.Code,
                    Name: equipment.Name,
                    L:equipment.length,
                    DepartmentCode:equipment.Department.dataValues.Name,
                    AgentSupplierId:equipment.AgentSupplier.dataValues.Name
                  }
                })

            AgentSupplier.findAll().then(agents => {
                const ag = agents.map(agent => {
                    return {
                        Name:agent.Name,
                        Id:agent.Id
                    }
                })        
        res.render('home',{pageTitle:'Equipment',Equipment:true,
                                equipments:eq,hasEquipments:eq.length>0,Agents:ag});
            })               
    }).catch( err => {
        if(err)
         res.render('error',{layout:false,pageTitle:'Error',href:'/home',message:'Sorry !!! Could Not Get Equipments'})
        })


   
}