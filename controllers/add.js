const bcrypt = require('bcryptjs')
const Department = require('../models/department')
const AgentSupplier = require('../models/agent_supplier')
const Equipment = require('../models/equipment')
const SpareParts = require('../models/spare_part')
const BreakDowns = require('../models/break_down')
const WorkOrders = require('../models/work_order')
const Maintenance = require('../models/maintenance')
const ChefService = require('../models/chef_Service');
const Technicien = require('../models/technicien');
const Magazinier = require('../models/magazinier');
const WorkOrder = require('../models/work_order');


require("dotenv").config();


exports.addDepartment = (req, res) => {
    code = req.body.Code
    name = req.body.Name
    Department.create({ Code: code, Name: name }).then(dep => {
        res.redirect('/department');
    }).catch(err => {
        console.log("ERROR!!!!!!", err)
    })


}



exports.addAgentSupplier = async (req, res) => {
    const { Id, Name, Address, Phone, Email, Notes } = req.body;
  
    try {
      const existingTechnicien = await Technicien.findOne({ where: { Email } });
      const existingservicemanager = await ChefService.findOne({ where: { Email } });
      const existingstorekeeper = await Magazinier.findOne({ where: { Email } });
      const existingTechniciennumber = await Technicien.findOne({ where: { Phone } });
      const existingservicemanagernumber = await ChefService.findOne({ where: { Phone } });
      const existingstorekeepernumber = await Magazinier.findOne({ where: { Phone } });
      //const existingagent = await AgentSupplier.findOne({ where: { Email } });
      const existingagentnumber = await AgentSupplier.findOne({ where: { Phone } });
  
      if (existingTechnicien || existingservicemanager || existingstorekeeper) {
        return res.send('please choose a different email address');
      }
  
      if (existingTechniciennumber || existingservicemanagernumber || existingstorekeepernumber) {
        return res.send('please choose a different phone number');
      }
  
      const agentSupplier = await AgentSupplier.findByPk(Id);
  
      if (agentSupplier) {
        agentSupplier.Name = Name;
        agentSupplier.Address = Address;
        agentSupplier.Phone = Phone;
        agentSupplier.Email = Email;
        agentSupplier.Notes = Notes;
        await agentSupplier.save();
      } else {
        await AgentSupplier.create({
          Id,
          Name,
          Adress: Address,
          Phone,
          Email,
          Notes,
        });
      }
  
      res.redirect('/agentSupplier');
    } catch (error) {
      console.log('ERROR!!!!!!', error);
      res.send("Email adress already existing !! ")
    }
  };

exports.addChefService = async (req, res) => {
    const id = req.body.ID;
    const fname = req.body.FName;
    const lname = req.body.LName;
    const address = req.body.Address;
    const phone = req.body.Phone;
    const email = req.body.Email;
    let image;
    if (req.body.edit) {
        image = req.body.Image;
    } else {
        const imagePath = req.file.path.split(/[\\/]/);
        image = imagePath[imagePath.length - 1];
    }
    const age = req.body.Age;
    const department = req.body.Department;
    let departmentCode = null;
    let pass;

    if (req.body.Password) {
        const salt = await bcrypt.genSalt(10);
        pass = await bcrypt.hash(req.body.Password, salt);
    }

    try {
        const existingTechnicien = await Technicien.findOne({ where: { Email: email } });
        const existingMagazinier = await Magazinier.findOne({ where: { Email: email } });
       // const existingnumber = await ChefService.findOne({ where: { Phone: phone } });
       // const existingServicemanager = await ChefService.findOne({ where: { Email: email } });
        const existingnumber2 = await Magazinier.findOne({ where: { Phone: phone } });
        const existingnumber3 = await Technicien.findOne({ where: { Phone: phone } });



        if (existingTechnicien || existingMagazinier) {
            res.send('Error Please try a different email adress');
            return;
        }
        if ( existingnumber2 || existingnumber3){
            res.send('Error the service manager must have a different phone number');
        }
        const existingDepartment = await Department.findOne({ where: { Name: department } });

        if (existingDepartment) {
            departmentCode = existingDepartment.Code;
            const chefService = await ChefService.findByPk(id);
            if (chefService) {
                chefService.FName = fname;
                chefService.LName = lname;
                chefService.Adress = address;
                chefService.Phone = phone;
                chefService.Email = email;
                chefService.Age = age;
                await chefService.save();
                res.redirect('/chefservice');
            } else {
                await ChefService.create({
                    FName: fname,
                    LName: lname,
                    Adress: address,
                    Phone: phone,
                    Image: image,
                    Email: email,
                    Age: age,
                    DepartmentCode: departmentCode,
                    Password: pass
                });
                res.redirect('/chefService');
            }
        } else {
            // Handle department not found
        }
    } catch (error) {
        console.log(error)
    }
};
exports.addTechnicien = async (req, res) => {
    id = req.body.ID
    fname = req.body.FName
    lname = req.body.LName
    address = req.body.Address
    phone = req.body.Phone
    email = req.body.Email
    if (req.body.edit) {
        image = req.body.Image
    }
    else {
        image = req.file.path.split('\\')
        if (image.length > 1)
            image = req.file.path.split('\\').pop()
        else
            image = req.file.path.split('/').pop()

    }
    age = req.body.Age
    department = req.body.Department
    var departmentCode = null
    if (req.body.Password)
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.Password, salt, (err, hash) => {
                pass = hash
            });

        });
    try {
        const existingTechnicien = await ChefService.findOne({ where: { Email: email } });
        const existingMagazinier = await Magazinier.findOne({ where: { Email: email } });
        const existingTechniciennumber = await ChefService.findOne({ where: { Phone: phone } });
        const existingMagaziniernumber = await Magazinier.findOne({ where: { Phone: phone } });

        if (existingTechnicien || existingMagazinier) {
            res.send('EmailAlready existing ! ');
            return;
        }
        if (existingTechniciennumber || existingMagaziniernumber) {
            res.send('Phone number Already existing ! ');
            return;
        }
        const existingDepartment = await Department.findOne({ where: { Name: department } });

        if (existingDepartment) {
            departmentCode = existingDepartment.Code;
            const technicien = await Technicien.findByPk(id);
            if (technicien) {
                technicien.FName = fname;
                technicien.LName = lname;
                technicien.Adress = address;
                technicien.Phone = phone;
                technicien.Email = email;
                technicien.Age = age;
                await technicien.save();
                res.redirect('/technicien');
            } else {
                await Technicien.create({
                    FName: fname,
                    LName: lname,
                    Adress: address,
                    Phone: phone,
                    Image: image,
                    Email: email,
                    Age: age,
                    DepartmentCode: departmentCode,
                    Password: pass
                });
                res.redirect('/technicien');
            }
        } else {
            // Handle department not found
        }
    } catch (error) {
        // Handle error
    }

};
exports.addMagazinier = async (req, res) => {
  const id = req.body.ID;
  const fname = req.body.FName;
  const lname = req.body.LName;
  const address = req.body.Address;
  const phone = req.body.Phone;
  const email = req.body.Email;
  const pass = req.body.Password;

  let image, age, departmentCode;
  
  if (req.body.edit) {
    image = req.body.Image;
  } else {
    image = req.file.path.split('\\');
    if (image.length > 1) {
      image = req.file.path.split('\\').pop();
    } else {
      image = req.file.path.split('/').pop();
    }
  }

  age = req.body.Age;
  department = req.body.Department;

  try {
    const existingTechnicien = await Technicien.findOne({ where: { Email: email } });
    const existingservicemanager = await ChefService.findOne({ where: { Email: email } });
    const existingTechniciennumber = await Technicien.findOne({ where: { Phone: phone } });
    const existingservicemanagernumber = await ChefService.findOne({ where: { Phone: phone } });

    if (existingTechnicien || existingservicemanager) {
      res.send('please choose a different email address');
      return;
    }
    if (existingTechniciennumber || existingservicemanagernumber) {
      res.send('please choose a different phone number');
      return;
    }

    const existingDepartment = await Department.findOne({ where: { Name: department } });

    if (existingDepartment) {
      departmentCode = existingDepartment.Code;

      const magasinier = await Magazinier.findByPk(id);

      if (magasinier) {
        magasinier.FName = fname;
        magasinier.LName = lname;
        magasinier.Adress = address;
        magasinier.Phone = phone;
        magasinier.Email = email;
        magasinier.Age = age;
        await magasinier.save();
        res.redirect('/Magazinier');
      } else {
        await Magazinier.create({
          FName: fname,
          LName: lname,
          Adress: address,
          Phone: phone,
          Image: image,
          Email: email,
          Age: age,
          DepartmentCode: departmentCode,
          Password: pass
        });
        res.redirect('/Magazinier');
      }
    } else {
      res.send('Department not found'); // Handle department not found
    }
  } catch (error) {
    console.log(error);
    res.send('An error occurred'); // Handle error
  }
};



exports.addEquipment = (req, res) => {
    code = req.body.Code
    name = req.body.Name
    cost = req.body.Cost
    if (req.body.edit) {
        image = req.body.Image
    }
    else {
        image = req.file.path.split('\\')
        if (image.length > 1)
            image = req.file.path.split('\\').pop()
        else
            image = req.file.path.split('/').pop()
    }
    model = req.body.Model
    serialnumber = req.body.SerialNumber
    installationdate = req.body.InstallationDate
    arrivaldate = req.body.ArrivalDate
    warrantydate = req.body.WarrantyDate
    manufacturer = req.body.Manufacturer
    lifespan = req.body.LifeSpanDate
    department = req.body.Department
    agent = req.body.Agent
    pm = req.body.PMP
    notes = req.body.Notes
    var departmentCode = null
    var agentCode = null
    Department.findOne({ where: { Name: department } }).then(department => {
        if (department) {
            departmentCode = department.Code
            AgentSupplier.findOne({ where: { Id: agent } }).then(agent => {
                if (agent) {
                    agentCode = agent.Id
                    Equipment.findByPk(code).then(equipment => {
                        if (equipment) {
                            equipment.Name = name
                            equipment.Cost = cost
                            equipment.Image = image
                            equipment.Model = model
                            equipment.PMP = pm
                            equipment.ArrivalDate = arrivaldate
                            equipment.WarrantyDate = warrantydate
                            equipment.Notes = notes
                            equipment.InstallationDate = installationdate
                            equipment.SerialNumber = serialnumber
                            equipment.Manufacturer = manufacturer
                            equipment.LifeSpanDate = lifespan
                            equipment.DepartmentCode = departmentCode
                            equipment.AgentSupplierId = agentCode
                            equipment.save().then(equipment => res.redirect('/equipment'))
                        }

                        else {
                            Equipment.create({
                                Name: name, Image: image, ArrivalDate: arrivaldate, WarrantyDate: warrantydate, PMP: pm,
                                Cost: cost, Model: model, SerialNumber: serialnumber, AgentSupplierId: agentCode, Notes: notes,
                                LifeSpanDate: lifespan, Manufacturer: manufacturer, InstallationDate: installationdate, DepartmentCode: departmentCode
                            })
                                .then(equipment => res.redirect('/equipment'))
                        }
                    })
                }
                else
                    res.render('error', { layout: false, pageTitle: 'Error', href: '/equipment', message: 'Sorry !!! Could Not Get this Agent' })
            })
        }
        else {
            res.render('error', { layout: false, pageTitle: 'Error', href: '/equipment', message: 'Sorry !!! Could Not Get this Department' })
        }
    }).catch(err => {
        if (err)
            res.render('error', { layout: false, pageTitle: 'Error', href: '/sparePart', message: 'Sorry !!! Could Not Add This Chef Service ' })


    })

}

exports.addEquipmentMG = (req, res) => {
    code = req.body.Code
    name = req.body.Name
    cost = req.body.Cost
    if (req.body.edit) {
        image = req.body.Image
    }
    else {
        image = req.file.path.split('\\')
        if (image.length > 1)
            image = req.file.path.split('\\').pop()
        else
            image = req.file.path.split('/').pop()
    }
    model = req.body.Model
    serialnumber = req.body.SerialNumber
    installationdate = req.body.InstallationDate
    arrivaldate = req.body.ArrivalDate
    warrantydate = req.body.WarrantyDate
    lifespan = req.body.LifeSpanDate
    manufacturer = req.body.Manufacturer
    department = req.body.Department
    agent = req.body.Agent
    pm = req.body.PMP
    notes = req.body.Notes
    var departmentCode = null
    var agentCode = null
    Department.findOne({ where: { Name: department } }).then(department => {
        if (department) {
            departmentCode = department.Code
            AgentSupplier.findOne({ where: { Id: agent } }).then(agent => {
                if (agent) {
                    agentCode = agent.Id
                    Equipment.findByPk(code).then(equipment => {
                        if (equipment) {
                            equipment.Name = name
                            equipment.Cost = cost
                            equipment.Image = image
                            equipment.Model = model
                            equipment.PMP = pm
                            equipment.ArrivalDate = arrivaldate
                            equipment.WarrantyDate = warrantydate
                            equipment.Notes = notes
                            equipment.InstallationDate = installationdate
                            equipment.SerialNumber = serialnumber
                            equipment.Manufacturer = manufacturer
                            equipment.LifeSpanDate = lifespan
                            equipment.DepartmentCode = departmentCode
                            equipment.AgentSupplierId = agentCode
                            equipment.save().then(equipment => res.redirect('/equipments'))
                        }

                        else {
                            Equipment.create({
                                Name: name, Image: image, ArrivalDate: arrivaldate, WarrantyDate: warrantydate, PMP: pm,
                                Cost: cost, Model: model, SerialNumber: serialnumber, AgentSupplierId: agentCode, Notes: notes,
                                LifeSpanDate: lifespan, Manufacturer: manufacturer, InstallationDate: installationdate, DepartmentCode: departmentCode
                            })
                                .then(equipment => res.redirect('/equipments'))
                        }
                    })
                }
                else
                    res.render('error', { layout: "MagazinerLayout", pageTitle: 'Error', href: '/equipments', message: 'Sorry !!! Could Not Get this Agent' })
            })
        }
        else {
            res.render('error', { layout: "MagazinerLayout", pageTitle: 'Error', href: '/equipments', message: 'Sorry !!! Could Not Get this Department' })
        }
    }).catch(err => {
        if (err)
            res.render('error', { layout: "MagazinerLayout", pageTitle: 'Error', href: '/sparePart', message: 'Sorry !!! Could Not Add This Chef Service ' })


    })

}

exports.addSpareParts = (req, res) => {
    code = req.body.Code
    name = req.body.Name
    serialnumber = req.body.SerialNumber
    agentId = req.body.AgentSupplierId
    equipmentCode = req.body.EquipmentCode
    if (req.body.edit) {
        image = req.body.Image
    }
    else {
        image = req.file.path.split('\\')
        if (image.length > 1)
            image = req.file.path.split('\\').pop()
        else
            image = req.file.path.split('/').pop()

    }
    AgentSupplier.findOne({ where: { Id: agentId } }).then(agent => {
        if (agent) {
            SpareParts.findByPk(code).then(part => {
                if (part) {
                    part.Code = code
                    part.Name = name
                    part.SerialNumber = serialnumber
                    part.AgentSupplierId = agentId
                    part.EquipmentCode = equipmentCode
                    part.Image = image
                    part.save().then(p => res.redirect('/sparePart'))
                }
                else {
                    SpareParts.create({ Code: code, SerialNumber: serialnumber, Name: name, AgentSupplierId: agentId, Image: image, EquipmentCode: equipmentCode })
                        .then(res.redirect('/sparePart'))
                }

            })
        }
        else
            return res.render('error', { layout: false, pageTitle: 'Error', href: '/sparePart', message: 'Sorry !!! Could Not Get this Agent' })

    }).catch(err => {
        res.render('error', { layout: false, pageTitle: 'Error', href: '/sparePart', message: 'Sorry !!! Could Not Gey rhis page' })
    })

}



exports.addBreakDown = (req, res) => {
    code = req.body.Code
    reason = req.body.Reason
    date = req.body.DATE
    equipmentId = req.body.EquipmentCode
    Equipment.findOne({ where: { Code: equipmentId } }).then(Equipment => {
        if (Equipment) {
            BreakDowns.findByPk(code).then(breakD => {
                if (breakD) {
                    breakD.Code = code
                    breakD.Reason = reason
                    breakD.DATE = date
                    breakD.EquipmentCode = equipmentId
                    breakD.save().then(res.redirect('/breakDown'))
                }

                BreakDowns.create({ Code: code, Reason: reason, DATE: date, EquipmentCode: equipmentId })
                    .then(res.redirect('/breakDown'))
                    .catch(err => {
                        console.log("ERROR!!!!!!", err)
                    })
            })
        }
        else
            return res.render('error', { layout: false, pageTitle: 'Error', href: '/breakDown', message: 'Sorry !!! Could Not Get this Equipment' })

    })

}
exports.addPanneTech = (req, res) => {
    code = req.body.Code
    reason = req.body.Reason
    date = req.body.DATE
    equipmentId = req.body.EquipmentCode
    Equipment.findOne({ where: { Code: equipmentId } }).then(Equipment => {
        if (Equipment) {
            BreakDowns.findByPk(code).then(breakD => {
                if (breakD) {
                    breakD.Code = code
                    breakD.Reason = reason
                    breakD.DATE = date
                    breakD.EquipmentCode = equipmentId
                    breakD.save().then(res.redirect('/technicien/panne'))
                }

                BreakDowns.create({ Code: code, Reason: reason, DATE: date, EquipmentCode: equipmentId })
                    .then(res.redirect('/technicien/panne'))
                    .catch(err => {
                        console.log("ERROR!!!!!!", err)
                    })
            })
        }
        else
            return res.render('error', { layout: "TechnicienLayout", pageTitle: 'Error', href: '/technicien/panne', message: 'Sorry !!! Could Not Get this Equipment' })

    })

}

accountSid = 'AC8c10989ddf3e03b9d4b62ed562050bf4';
authToken = '540bbef39a46b55c6957d9aab16faefe';
const client = require('twilio')(accountSid, authToken);
exports.addWorkOrder = (req, res) => {
    code = req.body.Code
    startdate = req.body.StartDATE
    enddate = req.body.EndDATE
    description = req.body.Description
    priority = req.body.Priority
    equipmentId = req.body.EquipmentCode
    techID = req.body.TechnicienID
    etat = req.body.Etat
    var equId = null
    var engId = null
    Equipment.findOne({ where: { Code: equipmentId } }).then(equipment => {
        if (equipment) {
            equIName = equipment.Name
            equId = equipment.Code
            Technicien.findOne({ where: { ID: techID } }).then(technicien => {
                if (technicien) {
                    const technicianPhoneNumber = '+216' + technicien.Phone;
                    client.messages
                        .create({
                            body: ` Hello Mr ${technicien.FName} New work order assigned to you. Broken Equipment is ${equIName}`,
                            from: '+13158722073',
                            to: technicianPhoneNumber
                        })
                        .then(message => console.log(message.sid))
                        .catch(error => console.log(error));
                    engId = technicien.ID
                    WorkOrders.findByPk(code).then(workorder => {
                        if (workorder) {
                            workorder.StartDATE = startdate
                            workorder.EndDATE = enddate
                            workorder.Description = description
                            workorder.Etat = etat
                            workorder.EquipmentCode = equId
                            workorder.TechnicienID = engId
                            workorder.Priority = priority
                            workorder.save().then(workorder => res.redirect('/workOrder'))
                        }
                        else {
                            WorkOrders.create({
                                StartDate: startdate, EndDate: enddate, Description: description,
                                Etat: etat, EquipmentCode: equId, TechnicienID: engId, Priority: priority
                            })
                                .then(workorder => res.redirect('/workOrder'))
                        }
                    })

                }



                else
                    res.render('error', { layout: false, pageTitle: 'Error', href: '/workOrder', message: 'Sorry !!! Could Not Get this Chef Service' })


            })

        }
        else {
            res.render('error', { layout: false, pageTitle: 'Error', href: '/workOrder', message: 'Sorry !!! Could Not Get this Equipment' })
        }
    }).catch(err => {
        if (err)
            res.render('error', { layout: false, pageTitle: 'Error', href: '/workOrder', message: 'Sorry !!! Could Not Add This Work Order ' })


    })

}
exports.addMaintenance = (req, res) => {
    code = req.body.Id
    ID = req.body.ID
    startdate = req.body.StartDate
    enddate = req.body.EndDate
    breakdowncode = req.body.BreakDownID
    description = req.body.Description
    Spareparts = req.body.SparePartCode

    var breakdown = null
    BreakDowns.findOne({ where: { Code: breakdowncode } }).then(breakdown => {
        if (breakdown) {
            Maintenance.findByPk(code).then(main => {
                if (main) {
                    main.StartDate = startdate
                    main.EndDate = enddate
                    main.PanneCode = breakdowncode
                    main.Description = description
                    main.TechnicienID = ID
                    main.SparePartCode = Spareparts
                    main.save().then(p => res.redirect('/maintenance'))
                }
                else {
                    Maintenance.create({ StartDate: startdate, EndDate: enddate, TechnicienID: ID, PanneCode: breakdowncode, Description: description, SparePartCode: Spareparts })
                        .then(res.redirect('/maintenance'))
                }

            })
        }
        else
            return res.render('error', { layout: false, pageTitle: 'Error', href: '/maintenance', message: 'Sorry !!! Could Not Get this Break down' })
        console.log(err)

    }).catch(err => {
        console.log("ERROR!!!!!!", err)
    })

}
exports.workorderEtat = (req, res) => {
    const code = req.body.Code;
    const etat = req.body.Etat;

    WorkOrder.findOne({ where: { Code: code }, include: [{ model: Equipment }] })
        .then(order => {
            if (order) {
                order.Etat = etat;
                return order.save();
            }
            return order;
        })
        .then(order => {
            if (order) {
                res.redirect('/technicien/workOrder/description/'+code);
            } else {
                res.render('workOrderDetails', {
                    layout: 'TechnicienLayout',
                    pageTitle: 'WorkOrder',
                    order: true
                });
            }
        })
        .catch(error => {
            // Handle any errors that occur during the database operations or rendering
            console.error(error);
            res.status(500).send('An error occurred.');
        });
};
