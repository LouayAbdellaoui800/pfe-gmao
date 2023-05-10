const bcrypt = require('bcryptjs')
const Department = require('../models/department')
const AgentSupplier = require('../models/agent_supplier')
const Equipment =require('../models/equipment')
const SpareParts = require('../models/spare_part')
const BreakDowns = require('../models/break_down')
const WorkOrders = require('../models/work_order')
const Maintenance = require('../models/maintenance')
const ChefService=require('../models/chef_Service');
const Technicien=require('../models/technicien');
const Magazinier=require('../models/magazinier');

require("dotenv").config();


exports.addDepartment=(req,res)=>{
   code=req.body.Code
   name=req.body.Name
   location=req.body.Location
   Department.create({Code:code,Name:name,Location:location}).then(dep =>{
       res.redirect('/department');
   }).catch(err=> {
    console.log("ERROR!!!!!!",err)
})


}



exports.addAgentSupplier=(req,res)=>{
    id=req.body.Id
    name=req.body.Name
    address=req.body.Address
    phone=req.body.Phone
    email=req.body.Email
    notes=req.body.Notes
    AgentSupplier.findByPk(id).then(agentSupplier => {
        if(agentSupplier){
            agentSupplier.Id=id;
            agentSupplier.Name=name;
            agentSupplier.Address=address;
            agentSupplier.Phone=phone;
            agentSupplier.Email=email;
            agentSupplier.Notes=notes;
            return agentSupplier.save();
        }
        else{
            return AgentSupplier.create({Id:id,Name:name,Adress:address,
                Phone:phone,Email:email,Notes:notes})
        }

    }).then(r => res.redirect('/agentSupplier'))
    .catch(err => console.log("ERROR!!!!!!",err))
}



exports.addChefService=(req,res)=>{
    id=req.body.ID
    fname=req.body.FName
    lname=req.body.LName
    address=req.body.Address
    phone=req.body.Phone
    email=req.body.Email
    if(req.body.edit){
        image=req.body.Image
    }
    else{
        image=req.file.path.split('\\')
        if (image.length>1)
            image=req.file.path.split('\\').pop()
        else    
        image=req.file.path.split('/').pop()

    }
    age=req.body.Age
    workhours=req.body.workHours
    department=req.body.Department
    var departmentCode=null
    if(req.body.Password)   
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.Password, salt, (err, hash) => {
                pass=hash 
            });

        });
    Department.findOne({where:{Name:department}}).then(department => { 
        if (department){

            departmentCode=department.Code
            ChefService.findByPk(id).then(chefservices=>{
                if(chefservices){
                    chefservices.ID=id
                    chefservices.FName=fname
                    chefservices.LName=lname
                    chefservices.Adress=address
                    chefservices.Phone=phone
                    chefservices.Email=email
                    chefservices.Image=image
                    chefservices.Age=age
                    chefservices.WorkHours=workhours
                    chefservices.DepartmentCode=departmentCode
                    chefservices.save().then(r => res.redirect('/chefService'))
                }
                else{

                    ChefService.create({ID:id,FName:fname,LName:lname,Adress:address,Phone:phone,Image:image,Email:email,Age:age,WorkHours:workhours,DepartmentCode:departmentCode,Password:pass}).then(r => res.redirect('/chefService'))
                }
            })
        }
        else{
            res.render('error',{layout:false,pageTitle:'Error',href:'/chefService',message:'Sorry !!! Could Not Get this Department'})                

        }
    })
    .catch(err =>res.render('error',{layout:false,pageTitle:'Error',href:'/equipment',message:'Sorry !!! Could Not Get ChefServices'})                
        )

}

exports.addTechnicien=(req,res)=>{
    id=req.body.ID
    fname=req.body.FName
    lname=req.body.LName
    address=req.body.Address
    phone=req.body.Phone
    email=req.body.Email
    if(req.body.edit){
        image=req.body.Image
    }
    else{
        image=req.file.path.split('\\')
        if (image.length>1)
            image=req.file.path.split('\\').pop()
        else    
        image=req.file.path.split('/').pop()

    }
    age=req.body.Age
    workhours=req.body.workHours
    department=req.body.Department
    var departmentCode=null
    if(req.body.Password)   
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.Password, salt, (err, hash) => {
                pass=hash 
            });

        });
    Department.findOne({where:{Name:department}}).then(department => { 
        if (department){

            departmentCode=department.Code
            Technicien.findByPk(id).then(technicien=>{
                if(technicien){
                    technicien.ID=id
                    technicien.FName=fname
                    technicien.LName=lname
                    technicien.Adress=address
                    technicien.Phone=phone
                    technicien.Email=email
                    technicien.Image=image
                    technicien.Age=age
                    technicien.WorkHours=workhours
                    technicien.DepartmentCode=departmentCode
                    technicien.save().then(r => res.redirect('/technicien'))
                }
                else{

                    Technicien.create({ID:id,FName:fname,LName:lname,Adress:address,Phone:phone,Image:image,Email:email,Age:age,WorkHours:workhours,DepartmentCode:departmentCode,Password:pass}).then(r => res.redirect('/technicien'))
                }
            })
        }
        else{
            res.render('error',{layout:false,pageTitle:'Error',href:'/technicien',message:'Sorry !!! Could Not Get this Department'})                

        }
    })
    .catch(err =>res.render('error',{layout:false,pageTitle:'Error',href:'/equipment',message:'Sorry !!! Could Not Get techniciens'})                
        )

}

exports.addMagazinier=(req,res)=>{
    id=req.body.ID
    fname=req.body.FName
    lname=req.body.LName
    address=req.body.Address
    phone=req.body.Phone
    email=req.body.Email
    if(req.body.edit){
        image=req.body.Image
    }
    else{
        image=req.file.path.split('\\')
        if (image.length>1)
            image=req.file.path.split('\\').pop()
        else    
        image=req.file.path.split('/').pop()

    }
    age=req.body.Age
    workhours=req.body.workHours
    department=req.body.Department
    var departmentCode=null
    if(req.body.Password)   
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.Password, salt, (err, hash) => {
                pass=hash 
            });

        });
    Department.findOne({where:{Name:department}}).then(department => { 
        if (department){

            departmentCode=department.Code
            Magazinier.findByPk(id).then(magaziniers=>{
                if(magaziniers){
                    magaziniers.ID=id
                    magaziniers.FName=fname
                    magaziniers.LName=lname
                    magaziniers.Adress=address
                    magaziniers.Phone=phone
                    magaziniers.Email=email
                    magaziniers.Image=image
                    magaziniers.Age=age
                    magaziniers.WorkHours=workhours
                    magaziniers.DepartmentCode=departmentCode
                    magaziniers.save().then(r => res.redirect('/magazinier'))
                }
                else{

                    Magazinier.create({ID:id,FName:fname,LName:lname,Adress:address,Phone:phone,Image:image,Email:email,Age:age,WorkHours:workhours,DepartmentCode:departmentCode,Password:pass}).then(r => res.redirect('/magaziniers'))
                }
            })
        }
        else{
            res.render('error',{layout:false,pageTitle:'Error',href:'/magaziniers',message:'Sorry !!! Could Not Get this Department'})                

        }
    })
    .catch(err =>res.render('error',{layout:false,pageTitle:'Error',href:'/equipment',message:'Sorry !!! Could Not Get magaziniers'})                
        )

}


exports.addEquipment=(req,res) => {
    code=req.body.Code
    name=req.body.Name
    cost=req.body.Cost
    if(req.body.edit){
        image=req.body.Image
    }
    else{
        image=req.file.path.split('\\')
        if (image.length>1)
            image=req.file.path.split('\\').pop()
        else    
        image=req.file.path.split('/').pop()
    }
    model=req.body.Model
    serialnumber=req.body.SerialNumber
    installationdate=req.body.InstallationDate
    arrivaldate=req.body.ArrivalDate
    warrantydate=req.body.WarrantyDate
    manufacturer=req.body.Manufacturer
    location=req.body.Location
    department=req.body.Department
    agent=req.body.Agent
    pm=req.body.PM
    notes=req.body.Notes
    var departmentCode=null
    var agentCode=null
    Department.findOne({where:{Name:department}}).then(department => { 
        if (department){
            departmentCode=department.Code
            AgentSupplier.findOne({where:{Id:agent}}).then(agent =>{
                if(agent){
                    agentCode=agent.Id
                    Equipment.findByPk(code).then(equipment=>{
                        if(equipment){
                            equipment.Code=code
                            equipment.Name=name
                            equipment.Cost=cost
                            equipment.Image=image
                            equipment.Model=model
                            equipment.PM=pm
                            equipment.ArrivalDate=arrivaldate
                            equipment.WarrantyDate=warrantydate
                            equipment.Notes=notes
                            equipment.InstallationDate=installationdate
                            equipment.SerialNumber=serialnumber
                            equipment.Manufacturer=manufacturer
                            equipment.Location=location
                            equipment.DepartmentCode=departmentCode
                            equipment.AgentSupplierId=agentCode
                            equipment.save().then(equipment => res.redirect('/equipments'))
                        }

                        else
                        {
                            Equipment.create({Code:code,Name:name,Image:image,ArrivalDate:arrivaldate,WarrantyDate:warrantydate,PM:pm,
                                Cost:cost,Model:model,SerialNumber:serialnumber,AgentSupplierId:agentCode,Notes:notes,
                                Location:location,Manufacturer:manufacturer,InstallationDate:installationdate,DepartmentCode:departmentCode})
                            .then(equipment => res.redirect('/equipments') )
                        }
                    })
                }
                else
                  res.render('error',{layout:false,pageTitle:'Error',href:'/equipments',message:'Sorry !!! Could Not Get this Agent'})                
          })
        }
        else{
            res.render('error',{layout:false,pageTitle:'Error',href:'/equipments',message:'Sorry !!! Could Not Get this Department'})
        }
    }).catch(err => {
        if(err)
           res.render('error',{layout:false,pageTitle:'Error',href:'/sparePart',message:'Sorry !!! Could Not Add This Chef Service '})


   })

}

exports.addEquipmentMG=(req,res) => {
    code=req.body.Code
    name=req.body.Name
    cost=req.body.Cost
    if(req.body.edit){
        image=req.body.Image
    }
    else{
        image=req.file.path.split('\\')
        if (image.length>1)
            image=req.file.path.split('\\').pop()
        else    
        image=req.file.path.split('/').pop()
    }
    model=req.body.Model
    serialnumber=req.body.SerialNumber
    installationdate=req.body.InstallationDate
    arrivaldate=req.body.ArrivalDate
    warrantydate=req.body.WarrantyDate
    manufacturer=req.body.Manufacturer
    location=req.body.Location
    department=req.body.Department
    agent=req.body.Agent
    pm=req.body.PM
    notes=req.body.Notes
    var departmentCode=null
    var agentCode=null
    Department.findOne({where:{Name:department}}).then(department => { 
        if (department){
            departmentCode=department.Code
            AgentSupplier.findOne({where:{Id:agent}}).then(agent =>{
                if(agent){
                    agentCode=agent.Id
                    Equipment.findByPk(code).then(equipment=>{
                        if(equipment){
                            equipment.Code=code
                            equipment.Name=name
                            equipment.Cost=cost
                            equipment.Image=image
                            equipment.Model=model
                            equipment.PM=pm
                            equipment.ArrivalDate=arrivaldate
                            equipment.WarrantyDate=warrantydate
                            equipment.Notes=notes
                            equipment.InstallationDate=installationdate
                            equipment.SerialNumber=serialnumber
                            equipment.Manufacturer=manufacturer
                            equipment.Location=location
                            equipment.DepartmentCode=departmentCode
                            equipment.AgentSupplierId=agentCode
                            equipment.save().then(equipment => res.redirect('/equipments'))
                        }

                        else
                        {
                            Equipment.create({Code:code,Name:name,Image:image,ArrivalDate:arrivaldate,WarrantyDate:warrantydate,PM:pm,
                                Cost:cost,Model:model,SerialNumber:serialnumber,AgentSupplierId:agentCode,Notes:notes,
                                Location:location,Manufacturer:manufacturer,InstallationDate:installationdate,DepartmentCode:departmentCode})
                            .then(equipment => res.redirect('/equipments') )
                        }
                    })
                }
                else
                  res.render('error',{layout:"MagazinerLayout",pageTitle:'Error',href:'/equipments',message:'Sorry !!! Could Not Get this Agent'})                
          })
        }
        else{
            res.render('error',{layout:"MagazinerLayout",pageTitle:'Error',href:'/equipments',message:'Sorry !!! Could Not Get this Department'})
        }
    }).catch(err => {
        if(err)
           res.render('error',{layout:"MagazinerLayout",pageTitle:'Error',href:'/sparePart',message:'Sorry !!! Could Not Add This Chef Service '})


   })

}

exports.addSpareParts=(req,res)=>{
    code=req.body.Code
    name=req.body.Name
    amount=req.body.Amount
    agentId=req.body.AgentSupplierId
    equipmentCode=req.body.EquipmentCode
    if(req.body.edit){
        image=req.body.Image
    }
    else{
        image=req.file.path.split('\\')
        if (image.length>1)
            image=req.file.path.split('\\').pop()
        else    
        image=req.file.path.split('/').pop()

    }
    AgentSupplier.findOne({where:{Id:agentId}}).then(agent =>{
        if(agent){
            SpareParts.findByPk(code).then(part=>{
                if(part){
                    part.Code=code
                    part.Name=name
                    part.Amount=amount
                    part.AgentSupplierId=agentId
                    part.EquipmentCode=equipmentCode
                    part.Image=image
                    part.save().then(p => res.redirect('/sparePart'))
                }
                else{
                    SpareParts.create({Code:code,Name:name,Amount:amount,AgentSupplierId:agentId,Image:image,EquipmentCode:equipmentCode})
                    .then(res.redirect('/sparePart'))
                }

            })
        }
        else
           return res.render('error',{layout:false,pageTitle:'Error',href:'/sparePart',message:'Sorry !!! Could Not Get this Agent'})

   }).catch(err=> {
    res.render('error',{layout:false,pageTitle:'Error',href:'/sparePart',message:'Sorry !!! Could Not Gey rhis page'})
})

}



exports.addBreakDown=(req,res)=>{
    code=req.body.Code
    reason=req.body.Reason
    date=req.body.DATE
    equipmentId=req.body.EquipmentCode
    Equipment.findOne({where:{Code:equipmentId}}).then(Equipment =>{
        if(Equipment){
            BreakDowns.findByPk(code).then(breakD=>{
                if(breakD){
                    breakD.Code=code
                    breakD.Reason=reason
                    breakD.DATE=date
                    breakD.EquipmentCode=equipmentId
                    breakD.save().then(res.redirect('/breakDown'))
                }

                BreakDowns.create({Code:code,Reason:reason,DATE:date,EquipmentCode:equipmentId})
                .then(res.redirect('/breakDown'))
                .catch(err=> {
                    console.log("ERROR!!!!!!",err)
                })
            })
        }
        else
           return res.render('error',{layout:false,pageTitle:'Error',href:'/breakDown',message:'Sorry !!! Could Not Get this Equipment'})

   })

}
exports.addPanneTech=(req,res)=>{
    code=req.body.Code
    reason=req.body.Reason
    date=req.body.DATE
    equipmentId=req.body.EquipmentCode
    Equipment.findOne({where:{Code:equipmentId}}).then(Equipment =>{
        if(Equipment){
            BreakDowns.findByPk(code).then(breakD=>{
                if(breakD){
                    breakD.Code=code
                    breakD.Reason=reason
                    breakD.DATE=date
                    breakD.EquipmentCode=equipmentId
                    breakD.save().then(res.redirect('/technicien/panne'))
                }

                BreakDowns.create({Code:code,Reason:reason,DATE:date,EquipmentCode:equipmentId})
                .then(res.redirect('/technicien/panne'))
                .catch(err=> {
                    console.log("ERROR!!!!!!",err)
                })
            })
        }
        else
           return res.render('error',{layout:"TechnicienLayout",pageTitle:'Error',href:'/technicien/panne',message:'Sorry !!! Could Not Get this Equipment'})

   })

}

accountSid='AC9ad753430f8657f52d03db0c68c1d7a4';
authToken='a32dbf18319ec04ca4c497013799ff03';
const client = require('twilio')(accountSid, authToken);
exports.addWorkOrder=(req,res) => {
    code =req.body.Code
    cost=req.body.Cost
    startdate=req.body.StartDATE
    enddate=req.body.EndDATE
    description=req.body.Description
    priority = req.body.Priority
    equipmentId=req.body.EquipmentCode
    techID=req.body.TechnicienID
    var equId=null
    var engId=null
    Equipment.findOne({where:{Code:equipmentId}}).then(equipment => { 
        if(equipment){
            equIName=equipment.Name
            equId=equipment.Code
            Technicien.findOne({where:{ID:techID}}).then(technicien =>{
                if(technicien){
                    const technicianPhoneNumber = '+'+technicien.Phone;
                    client.messages
                    .create({
                      body: ` Hello Mr ${technicien.FName} New work order assigned to you. Broken Equipment is ${equIName}`,
                      from: '+13203012443',
                      to: technicianPhoneNumber
                  })
                    .then(message => console.log(message.sid))
                    .catch(error => console.log(error));
                engId = technicien.ID
                WorkOrders.findByPk(code).then(workorder=>{
                    if(workorder){
                        workorder.StartDATE=startdate
                        workorder.EndDATE=enddate
                        workorder.Description=description
                        workorder.Cost=cost
                        workorder.EquipmentCode=equId
                        workorder.TechnicienID=engId
                        workorder.Priority=priority
                        workorder.save().then(workorder => res.redirect('/workOrder'))
                    }
                    else {
                        WorkOrders.create({StartDate:startdate,EndDate:enddate,Description:description,
                            Cost:cost,EquipmentCode:equId,TechnicienID:engId,Priority:priority})
                        .then(workorder => res.redirect('/workOrder') )
                    }
                })

            }
            


            else
              res.render('error',{layout:false,pageTitle:'Error',href:'/workOrder',message:'Sorry !!! Could Not Get this Chef Service'})  


      })
            
        }
        else{
            res.render('error',{layout:false,pageTitle:'Error',href:'/workOrder',message:'Sorry !!! Could Not Get this Equipment'})
        }
    }).catch(err => {
        if(err)
           res.render('error',{layout:false,pageTitle:'Error',href:'/workOrder',message:'Sorry !!! Could Not Add This Work Order '})


   })

}


exports.addMaintenance=(req,res)=>{
    code=req.body.Id
    ID=req.body.ID
    startdate=req.body.StartDate
    enddate=req.body.EndDate
    breakdowncode=req.body.BreakDownID
    description=req.body.Description
    var breakdown = null
    BreakDowns.findOne({where:{Code:breakdowncode}}).then(breakdown =>{
        if(breakdown){
            Maintenance.findByPk(code).then(main=>{
                if(main){
                    main.StartDate=startdate
                    main.EndDate=enddate
                    main.PanneCode=breakdowncode
                    main.Description=description
                    main.TechnicienID=ID
                    main.save().then(p => res.redirect('/maintenance'))
                }
                else{
                    Maintenance.create({StartDate:startdate,EndDate:enddate,TechnicienID:ID,PanneCode:breakdowncode,Description:description})
                    .then(res.redirect('/maintenance'))
                }

            })
        }
        else
           return res.render('error',{layout:false,pageTitle:'Error',href:'/maintenance',message:'Sorry !!! Could Not Get this Break down'})
       console.log(err)

   }).catch(err=> {
    console.log("ERROR!!!!!!",err)
})

}
