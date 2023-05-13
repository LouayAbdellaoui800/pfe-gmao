const bcrypt = require('bcryptjs')
const Department = require('../models/department');
const AgentSupplier = require('../models/agent_supplier');
const BreakDown = require('../models/break_down');

const ChefService = require('../models/chef_Service');
const Technicien = require('../models/technicien');
const Magazinier = require('../models/magazinier');


const Equipment = require('../models/equipment');
const Maintenance = require('../models/maintenance');
const SparePart = require('../models/spare_part');
const WorkOrder = require('../models/work_order');
const DailyInspection = require('../models/dialy_inspection');
const PpmQuestions = require('../models/ppm_questions')
const PPM = require('../models/ppm')
const Problem = require('../models/problems');
const moment = require('moment')
const jwt = require('jsonwebtoken');
require("dotenv").config();
const secretKey = process.env.JWT_SECRET_KEY;
exports.homeSignIn = (req, res) => {
    res.render('newHome', { layout: false });
}


exports.signIn = (req, res) => {
    const { email, password } = req.body;

    // Admin login
    if (email === 'admin@gmail.com' && password === '0000') {
        const token = jwt.sign({ email: email, role: 'admin' }, process.env.JWT_SECRET_KEY);
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });
        res.redirect('/home');
    } else {
        // ChefService login
        ChefService.findOne({ where: { Email: email } }).then((chefser) => {
            if (chefser) {
                bcrypt.compare(password, chefser.Password).then((result) => {
                    if (result) {
                        const token = jwt.sign({ email: email, role: 'Chef', id: chefser.ID }, process.env.JWT_SECRET_KEY);
                        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });
                        req.session.ID = chefser.ID;
                        res.redirect('/index');
                    } else {
                        res.redirect('/');
                    }
                });
            } else {
                // Technicien login
                Technicien.findOne({ where: { Email: email } }).then((technicien) => {
                    if (technicien) {
                        bcrypt.compare(password, technicien.Password).then((result) => {
                            if (result) {
                                const token = jwt.sign({ email: email, role: 'user', id: technicien.ID }, process.env.JWT_SECRET_KEY);
                                res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });
                                req.session.ID = technicien.ID;
                                res.redirect("/technicien/dialyInspection");
                            } else {
                                res.redirect('/');
                            }
                        });
                    } else {
                        // Magazinier login
                        Magazinier.findOne({ where: { Email: email } }).then((magazinier) => {
                            if (magazinier) {
                                bcrypt.compare(password, magazinier.Password).then((result) => {
                                    if (result) {
                                        const token = jwt.sign({ email: email, role: 'magazinier', id: magazinier.ID }, process.env.JWT_SECRET_KEY);
                                        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });
                                        req.session.ID = magazinier.ID;
                                        res.redirect("/agentSupplier");
                                    } else {
                                        res.redirect('/');
                                    }
                                });
                            } else {
                                res.redirect('/');
                            }
                        });
                    }
                });
            }
        });
    }
};

exports.home = (req, res) => {
    res.render('home', { pageTitle: 'Home', Home: true });
}
exports.index = (req, res) => {
    res.render('index', { layout: 'ChefServiceLayout', pageTitle: "Welcome Chef Service" });
}
exports.dialyInspectionTech = (req, res) => {
    TechID = req.session.ID
    Equipment.findAll({ include: [{ model: Department }] }).then(equipments => {
        const eqs = equipments.map(equipment => {
            return {
                Name: equipment.Name,
                Code: equipment.Code,
                Department: equipment.Department.Name
            }
        })
        Technicien.findByPk(TechID).then(tech => {
            const Tech = {
                Image: tech.Image,
                FName: tech.FName,
                LName: tech.LName
            }
            res.render('dialyInspectionForm', {
                layout: 'TechnicienLayout', pageTitle: 'Dialy Inspection',
                DI: true, equipments: eqs, Tech: Tech
            })
        })
    })
}

exports.dialyInspectionTechPost = (req, res) => {
    code = req.body.Code
    date = req.body.DATE
    q1 = req.body.Q1
    q2 = req.body.Q2
    q3 = req.body.Q3
    q4 = req.body.Q4
    q5 = req.body.Q5
    q6 = req.body.Q6
    q7 = req.body.Q7
    q8 = req.body.Q8
    equipmentId = req.body.equipement
    TechID = req.session.ID


    q1 = q1 == "on" ? "on" : "off"
    q2 = q2 == "on" ? "on" : "off"
    q3 = q3 == "on" ? "on" : "off"
    q4 = q4 == "on" ? "on" : "off"
    q5 = q5 == "on" ? "on" : "off"
    q6 = q6 == "on" ? "on" : "off"
    q7 = q7 == "on" ? "on" : "off"
    q8 = q8 == "on" ? "on" : "off"





    Equipment.findByPk(equipmentId).then(equipment => {
        if (equipment) {
            Technicien.findByPk(TechID).then(technicien => {
                if (technicien) {
                    DailyInspection.create({ DATE: date, Q1: q1, Q2: q2, Q3: q3, Q4: q4, Q5: q5, Q6: q6, Q7: q7, Q8: q8, EquipmentCode: equipmentId, TechnicienID: TechID })
                        .then(dailyinspection => res.redirect('/technicien/dialyInspection'))
                }
                else {
                    res.render('error', { layout: false, pageTitle: 'Error', href: '/technicien/dialyInspection', message: 'Sorry !!! Could Not Get this technicien' })
                }
            })
        }
        else {
            res.render('error', { layout: false, pageTitle: 'Error', href: '/technicien/dialyInspection', message: 'Sorry !!! Could Not Get this Equipment' })
        }
    }).catch(err => {
        if (err) {
            console.log(err)
            res.render('error', { layout: false, pageTitle: 'Error', href: '/technicien/dialyInspection', message: 'Sorry !!! Could Not Add This Report ' })
        }

    })

}

exports.diagnostic = (req, res) => {
    TechID = req.session.ID
    Equipment.findAll({ include: [{ model: Department }] }).then(equipments => {
        const eqs = equipments.map(equipment => {
            return {
                Name: equipment.Name,
                Code: equipment.Code,
                Department: equipment.Department.Name
            }
        })
        Technicien.findByPk(TechID).then(tech => {
            const Tech = {
                Image: tech.Image,
                FName: tech.FName,
                LName: tech.LName
            }
            res.render('diagnosticForm', {
                layout: 'TechnicienLayout', pageTitle: 'Diagnostics',
                DA: true, equipments: eqs, Tech: Tech
            })
        })
    })
}
exports.diagnosticPost = (req, res) => {
    code = req.body.Code
    date = req.body.DATE
    desc = req.body.validationTextarea
    equipmentId = req.body.equipement
    TechID = req.session.ID
    Equipment.findByPk(equipmentId).then(equipment => {
        if (equipment) {
            Technicien.findByPk(TechID).then(technicien => {
                if (technicien) {
                    Problem.create({ DATE: date, DETAILS: desc, EquipmentCode: equipmentId, TechnicienID: TechID })
                        .then(dailyinspection => res.redirect('/technicien/dialyInspection'))
                }
                else {
                    res.render('error', { layout: false, pageTitle: 'Error', href: '/technicien/dialyInspection', message: 'Sorry !!! Could Not Get this technicien' })
                }
            })
        }
        else {
            res.render('error', { layout: false, pageTitle: 'Error', href: '/technicien/dialyInspection', message: 'Sorry !!! Could Not Get this Equipment' })
        }
    }).catch(err => {
        if (err) {
            console.log(err)
            res.render('error', { layout: false, pageTitle: 'Error', href: '/technicien/dialyInspection', message: 'Sorry !!! Could Not Add This Report ' })
        }

    })

}

exports.ppmTech = (req, res) => {
    TechID = req.session.ID
    Equipment.findAll({ include: [{ model: Department }] }).then(equipments => {
        const eqs = equipments.map(equipment => {
            return {
                Name: equipment.Name,
                Code: equipment.Code,
                Department: equipment.Department.Name
            }
        })
        Technicien.findByPk(TechID).then(tech => {
            const Tech = {
                Image: tech.Image,
                FName: tech.FName,
                LName: tech.LName
            }
            res.render('deviceForm', {
                layout: 'TechnicienLayout', pageTitle: 'PPM',
                PPM: true, equipments: eqs, Tech: Tech
            })
        })
    })

}
exports.ppmTechPost = (req, res) => {
    code = req.body.Code
    res.redirect('/technicien/ppm/' + code);
}

exports.ppmTechEquipment = (req, res) => {
    code = req.params.code
    TechID = req.session.ID
    PpmQuestions.findOne({ where: { EquipmentCode: code } }).then(ppm => {
        const Ppm = {
            Q1: ppm.Q1,
            Q2: ppm.Q2,
            Q3: ppm.Q3,
            Q4: ppm.Q4,
            Q5: ppm.Q5
        }
        Technicien.findByPk(TechID).then(tech => {
            const Tech = {
                Image: tech.Image,
                FName: tech.FName,
                LName: tech.LName
            }
            res.render('ppmForm', {
                layout: 'TechnicienLayout', pageTitle: 'Dialy Inspection',
                PPM: true, ppm: Ppm, Code: code, Tech: Tech
            })
        })
    })
}

exports.ppmTechEquipmentPost = (req, res) => {
    date = req.body.DATE
    equipmentId = req.params.Code
    TechID = req.session.ID
    q1 = req.body.Q1
    q2 = req.body.Q2
    q3 = req.body.Q3
    q4 = req.body.Q4
    q5 = req.body.Q5
    n1 = req.body.N1
    n2 = req.body.N2
    n3 = req.body.N3
    n4 = req.body.N4
    n5 = req.body.N5
    q1 = q1 == "on" ? "on" : "off"
    q2 = q2 == "on" ? "on" : "off"
    q3 = q3 == "on" ? "on" : "off"
    q4 = q4 == "on" ? "on" : "off"
    q5 = q5 == "on" ? "on" : "off"

    Equipment.findByPk(equipmentId).then(equipment => {
        if (equipment) {
            Technicien.findByPk(TechID).then(technicien => {
                if (technicien) {
                    PPM.create({ DATE: date, Q1: q1, Q2: q2, Q3: q3, Q4: q4, Q5: q5, N1: n1, N2: n2, N3: n3, N4: n4, N5: n5, EquipmentCode: equipmentId, TechnicienID: TechID })
                        .then(dailyinspection => res.redirect('/technicien/ppm'))
                }
                else {
                    res.render('error', { layout: false, pageTitle: 'Error', href: '/technicien/ppm', message: 'Sorry !!! Could Not Get this Chef' })
                }
            })
        }
        else {
            res.render('error', { layout: false, pageTitle: 'Error', href: '/technicien/ppm', message: 'Sorry !!! Could Not Get this Equipment' })
        }
    }).catch(err => {
        if (err) {
            console.log(err)
            res.render('error', { layout: false, pageTitle: 'Error', href: '/technicien/ppm', message: 'Sorry !!! Could Not Add This Report ' })
        }

    })




}

exports.department = (req, res) => {
    Department.findAll({
        include: [{ model: Technicien }, { model: Equipment }]
    }).then(departments => {
        const deps = departments.map(department => {
            return {
                Name: department.Name,
                Code: department.Code,
                Location: department.Location,
                Chef: department.Techniciens.length,
                Equipments: department.Equipment.length
            }
        })

        res.render('department', {
            pageTitle: 'Department',
            Department: true,
            departments: deps,
            hasDepartment: deps.length > 0
        });

    }).catch(err => {
        if (err) {
            console.log(err)
            res.render('error', { layout: false, pageTitle: 'Error', href: '/home', message: 'Sorry !!! Could Not Get Departments' })
        }
    })


}
exports.maintenance = (req, res) => {
    Maintenance.findAll({ include: [{ model: BreakDown, include: [{ model: Equipment, include: [{ model: Department }] }] }, { model: Technicien }] }).then(maintenances => {
        const m = maintenances.map(main => {
            return {
                Id: main.Id,
                StartDate: main.StartDate,
                EndDate: main.EndDate,
                BreakDownCode: main.Panne.Code,
                EquipmentName: main.Panne.Equipment.Name,
                EquipmentCode: main.Panne.Equipment.Code,
                EquipmentImage: main.Panne.Equipment.Image,
                Technicien: main.Technicien.FName + ' ' + main.Technicien.LName,
                TechnicienImage: main.Technicien.Image,
                Department: main.Panne.Equipment.Department.Name,
                Description: main.Description
            }

        })
        BreakDown.findAll({ include: [{ model: Equipment }] }).then(breakDowns => {
            const bd = breakDowns.map(breakDown => {
                return {
                    Code: breakDown.Code,
                    Date: breakDown.DATE,
                    EquipmentName: breakDown.Equipment.Name,
                    EquipmentCode: breakDown.Equipment.Code,
                    Reason: breakDown.Reason
                }

            })

            Technicien.findAll().then(chefServices => {
                const en = chefServices.map(ChefService => {
                    return {
                        FName: ChefService.FName,
                        LName: ChefService.LName,
                        ID: ChefService.ID
                    }
                })
                res.render('maintenance', {
                    layout: "ChefServiceLayout", pageTitle: 'Maintenance',
                    Maintenance: true, Maintenances: m,
                    hasMaintenance: m.length > 0, chef: en, breakDowns: bd
                });
            })
        })


    }).catch(err => {
        if (err)
            console.log(err)
        res.render('error', { layout: false, pageTitle: 'Error', href: '/home', message: 'Sorry !!! Could Not get any maintenance' })
    })


}

exports.panneTech = (req, res) => {
    BreakDown.findAll({ include: [{ model: Equipment, include: [{ model: Department }] }] }).then(breakdowns => {
        const bd = breakdowns.map(breakD => {
            return {
                Code: breakD.Code,
                Reason: breakD.Reason,
                DATE: breakD.DATE,
                EquipmentCode: breakD.EquipmentCode,
                EquipmentName: breakD.Equipment.Name,
                EquipmentImage: breakD.Equipment.Image,
                Department: breakD.Equipment.Department.Name
            }
        })
        Equipment.findAll({ include: [{ model: Department }] }).then(equipments => {
            const eqs = equipments.map(equipment => {
                return {
                    Name: equipment.Name,
                    Code: equipment.Code,
                    Department: equipment.Department.Name
                }
            })

            res.render('Panne', {
                layout: "TechnicienLayout", pageTitle: 'Panne', BreakDown: true, PN: bd,
                hasBreakDown: bd.length > 0, Equipments: eqs
            });
        })




    }).catch(err => {
        if (err)
            res.render('error', { layout: false, pageTitle: 'Error', href: '/home', message: 'Sorry !!! Could Not Get BreakDowns' })
    })
}


exports.chefService = (req, res) => {
    ChefID = req.session.ID
    ChefService.findAll({
        include: [{ model: Department }]
    }).then(ChefdeService => {
        const chefservices = ChefdeService.map(chefservice => {
            return {
                ID: chefservice.ID,
                FName: chefservice.FName,
                LName: chefservice.LName,
                Image: chefservice.Image,
                Adress: chefservice.Adress,
                Phone: chefservice.Phone,
                Email: chefservice.Email,
                Age: chefservice.Age,
                WorkHours: chefservice.WorkHours,
                DepartmentCode: chefservice.Department.Name
            }

        })


        res.render('chefService', {
            pageTitle: 'chefService', CS: true,
            ChefdeService: chefservices, hasChef: chefservices.length > 0
        });
    })

        .catch(err => {
            if (err)
                res.render('error', { layout: false, pageTitle: 'Error', href: '/home', message: 'Sorry !!! Could Not Get Chef Services' })
        })

}
exports.technicien = (req, res) => {

    Technicien.findAll({
        include: [{ model: Department }]
    }).then(tech => {
        const techniciens = tech.map(technicien => {
            return {
                ID: technicien.ID,
                FName: technicien.FName,
                LName: technicien.LName,
                Image: technicien.Image,
                Adress: technicien.Adress,
                Phone: technicien.Phone,
                Email: technicien.Email,
                Age: technicien.Age,
                WorkHours: technicien.WorkHours,
                DepartmentCode: technicien.Department.Name
            }

        })

        res.render('technicien', {
            layout: 'ChefServiceLayout', pageTitle: 'Technicien', TE: true,
            tech: techniciens, hasTech: techniciens.length > 0
        });
    })
        .catch(err => {
            if (err)
                res.render('error', { layout: false, pageTitle: 'Error', href: '/home', message: 'Sorry !!! Could Not Get Chef Services' })
        })

}
exports.magazinier = (req, res) => {
    Magazinier.findAll({
        include: [{ model: Department }]
    }).then(mag => {
        const magaziniers = mag.map(magazinier => {
            return {
                ID: magazinier.ID,
                FName: magazinier.FName,
                LName: magazinier.LName,
                Image: magazinier.Image,
                Adress: magazinier.Adress,
                Phone: magazinier.Phone,
                Email: magazinier.Email,
                Age: magazinier.Age,
                WorkHours: magazinier.WorkHours,
                DepartmentCode: magazinier.Department.Name
            }

        })
        res.render('magazinier', {
            pageTitle: 'Magazinier', MG: true,
            mag: magaziniers, hasMag: magaziniers.length > 0
        });
    })
        .catch(err => {
            if (err)
                res.render('error', { layout: false, pageTitle: 'Error', href: '/home', message: 'Sorry !!! Could Not Get Magaziniers' })
        })

}


exports.sparePart = (req, res) => {
    SparePart.findAll({ include: [{ model: AgentSupplier }, { model: Equipment }] }).then(sparepart => {
        const sp = sparepart.map(sparepart => {
            return {
                Code: sparepart.Code,
                Name: sparepart.Name,
                Amount: sparepart.Amount,
                Image: sparepart.Image,
                AgentSupplierId: sparepart.AgentSupplier.dataValues.Id,
                AgentSupplierName: sparepart.AgentSupplier.dataValues.Name,
                EquipmentCode: sparepart.Equipment.dataValues.Code,
                EquipmentName: sparepart.Equipment.dataValues.Name


            }
        })
        Equipment.findAll({ include: [{ model: Department }] }).then(equipments => {
            const eq = equipments.map(equipment => {
                return {
                    Code: equipment.Code,
                    Name: equipment.Name,
                    DepartmentName: equipment.Department.Name
                }
            })
            AgentSupplier.findAll().then(agents => {
                const ag = agents.map(agent => {
                    return {
                        Name: agent.Name,
                        Id: agent.Id
                    }
                })
                res.render('sparePart2', {
                    layout: "MagazinierLayout", pageTitle: 'SpareParts', SP: true, SpareParts: sp,
                    hasPart: sp.length > 0, Equipments: eq, Agents: ag
                });
            })
        })

    }).catch(err => {
        if (err)
            console.log(err)
        res.render('error', { layout: false, pageTitle: 'Error', href: '/home', message: 'Sorry !!! Could Not Get Spare Parts' })
    })
}

exports.agentSupplier = (req, res) => {
    AgentSupplier.findAll().then(agentsuppliers => {
        const as = agentsuppliers.map(agentsupplier => {
            return {
                Name: agentsupplier.Name,
                Id: agentsupplier.Id,
                Adress: agentsupplier.Adress,
                Phone: agentsupplier.Phone,
                Email: agentsupplier.Email,
                Notes: agentsupplier.Notes
            }
        })

        res.render('agentSupplier', {
            layout: "MagazinierLayout", pageTitle: 'AgentSupplier',
            AS: true, agentSuppliers: as,
            hasAgentSupplier: as.length > 0
        });
    }).catch(err => {
        if (err)
            res.render('error', { layout: false, pageTitle: 'Error', href: '/home', message: 'Sorry !!! Could Not Get Agents' })
    })
}

exports.workOrder = (req, res) => {
    WorkOrder.findAll({ include: [{ model: Technicien }, { model: Equipment }] }).then(workorders => {
        const wd = workorders.map(workD => {
            return {
                Code: workD.Code,
                Cost: workD.Cost,
                StartDate: workD.StartDate,
                EndDate: workD.EndDate,
                med: workD.Priority == 'Medium' ? true : false,
                high: workD.Priority == 'High' ? true : false,
                low: workD.Priority == 'Low' ? true : false,
                EquipmentCode: workD.Equipment.Code,
                EquipmentName: workD.Equipment.Name,
                EquipmentImage: workD.Equipment.Image,
                Priority: workD.Priority,
                Description: workD.Description,
                Technicien: workD.Technicien.FName + ' ' + workD.Technicien.LName,
                TechnicienImage: workD.Technicien.Image
            }
        })

        Technicien.findAll().then(chefservice => {
            const en = chefservice.map(chefservice => {
                return {
                    FName: chefservice.FName,
                    LName: chefservice.LName,
                    ID: chefservice.ID
                }
            })
            Equipment.findAll({ include: [{ model: Department }] }).then(equipments => {
                const eq = equipments.map(equipment => {
                    return {
                        Code: equipment.Code,
                        Name: equipment.Name,
                        DepartmentName: equipment.Department.Name
                    }
                })
                res.render('workOrder', {
                    layout: "ChefServiceLayout", pageTitle: 'WorkOrder',
                    WorkOrder: true, Workorders: wd,
                    hasWorkOrder: wd.length > 0, WO: true, Techniciens: en, Equipments: eq
                });
            })
        })

    }).catch(err => {
        if (err)
            console.log(err)
        res.render('error', { layout: false, pageTitle: 'Error', href: '/home', message: 'Sorry !!! Could Not Get WorkOrders' })
    })

}

exports.breakDown = (req, res) => {
    BreakDown.findAll({ include: [{ model: Equipment, include: [{ model: Department }] }] }).then(breakdowns => {
        const bd = breakdowns.map(breakD => {
            return {
                Code: breakD.Code,
                Reason: breakD.Reason,
                DATE: breakD.DATE,
                EquipmentCode: breakD.EquipmentCode,
                EquipmentName: breakD.Equipment.Name,
                EquipmentImage: breakD.Equipment.Image,
                Department: breakD.Equipment.Department.Name
            }
        })
        Equipment.findAll({ include: [{ model: Department }] }).then(equipments => {
            const eqs = equipments.map(equipment => {
                return {
                    Name: equipment.Name,
                    Code: equipment.Code,
                    Department: equipment.Department.Name
                }
            })
            res.render('breakDown', {
                layout: "ChefServiceLayout", pageTitle: 'BreakDown', BreakDown: true, breakDowns: bd,
                hasBreakDown: bd.length > 0, Equipments: eqs
            });
        })

    }).catch(err => {
        if (err)
            res.render('error', { layout: false, pageTitle: 'Error', href: '/home', message: 'Sorry !!! Could Not Get BreakDowns' })
    })
}
exports.equipment = (req, res) => {
    Equipment.findAll({
        include: [{ model: Department }, { model: AgentSupplier }]
    }).then(equipments => {
        const eq = equipments.map(equipment => {
            return {
                Code: equipment.Code,
                Name: equipment.Name,
                Cost: equipment.Cost,
                PM: equipment.PM,
                Image: equipment.Image,
                InstallationDate: equipment.InstallationDate,
                ArrivalDate: equipment.ArrivalDate,
                WarrantyDate: equipment.WarrantyDate,
                Model: equipment.Model,
                SerialNumber: equipment.SerialNumber,
                Manufacturer: equipment.Manufacturer,
                Location: equipment.Location,
                Notes: equipment.Notes,
                DepartmentCode: equipment.Department.dataValues.Name,
                AgentSupplierId: equipment.AgentSupplier.dataValues.Name
            }
        })

        AgentSupplier.findAll().then(agents => {
            const ag = agents.map(agent => {
                return {
                    Name: agent.Name,
                    Id: agent.Id
                }
            })
            res.render('equipements', {
                layout: "MagazinierLayout", pageTitle: 'Equipment', Equipment: true,
                equipments: eq, hasEquipments: eq.length > 0, Agents: ag
            });
        })
    }).catch(err => {
        if (err)
            res.render('error', { layout: false, pageTitle: 'Error', href: '/home', message: 'Sorry !!! Could Not Get Equipments' })
    })



}
exports.chefequipment = (req, res) => {
    Equipment.findAll({
        include: [{ model: Department }, { model: AgentSupplier }]
    }).then(equipments => {
        const eq = equipments.map(equipment => {
            return {
                Code: equipment.Code,
                Name: equipment.Name,
                Cost: equipment.Cost,
                PM: equipment.PM,
                Image: equipment.Image,
                InstallationDate: equipment.InstallationDate,
                ArrivalDate: equipment.ArrivalDate,
                WarrantyDate: equipment.WarrantyDate,
                Model: equipment.Model,
                SerialNumber: equipment.SerialNumber,
                Manufacturer: equipment.Manufacturer,
                Location: equipment.Location,
                Notes: equipment.Notes,
                DepartmentCode: equipment.Department.dataValues.Name,
                AgentSupplierId: equipment.AgentSupplier.dataValues.Name
            }
        })

        AgentSupplier.findAll().then(agents => {
            const ag = agents.map(agent => {
                return {
                    Name: agent.Name,
                    Id: agent.Id
                }
            })
            res.render('equipment', {
                layout: "ChefServiceLayout", pageTitle: 'Equipment', Equipment: true,
                equipments: eq, hasEquipments: eq.length > 0, Agents: ag
            });
        })
    }).catch(err => {
        if (err)
            res.render('error', { layout: false, pageTitle: 'Error', href: '/home', message: 'Sorry !!! Could Not Get Equipments' })
    })



}
//reports
exports.installation = (req, res) => {
    Equipment.findAll({
        include: [{ model: Department }, { model: AgentSupplier }]
    }).then(equipments => {
        const eq = equipments.map(equipment => {
            return {
                Code: equipment.Code,
                Name: equipment.Name,
                Cost: equipment.Cost,
                PM: equipment.PM,
                Image: equipment.Image,
                InstallationDate: equipment.InstallationDate,
                ArrivalDate: equipment.ArrivalDate,
                WarrantyDate: equipment.WarrantyDate,
                Model: equipment.Model,
                SerialNumber: equipment.SerialNumber,
                Manufacturer: equipment.Manufacturer,
                Location: equipment.Location,
                Notes: equipment.Notes,
                DepartmentCode: equipment.Department.dataValues.Name,
                AgentSupplierId: equipment.AgentSupplier.dataValues.Name
            }
        })
        res.render('installationTable', {
            layout: "ChefServiceLayout", pageTitle: 'Installation', Reports: true,
            reports: eq, hasReports: eq.length > 0
        });
    }).catch(err => {
        if (err)
            res.render('error', { layout: false, pageTitle: 'Error', href: '/', message: 'Sorry !!! Could Not Get Reports' })
    })
}

exports.ppm = (req, res) => {
    PPM.findAll({ include: [{ model: Equipment, include: [{ model: PpmQuestions }] }, { model: Technicien }] }).then(reports => {
        const reps = reports.map(report => {
            return {
                Code: report.Code,
                DATE: report.DATE,
                Tech: report.Technicien.FName + ' ' + report.Technicien.LName,
                EquipmentName: report.Equipment.Name,
                EquipmentCode: report.Equipment.Code,
                EquipmentModel: report.Equipment.Model,
                Qs: report.Equipment.PpmQuestion,
                Q1: report.Q1 == "on" ? true : false,
                Q2: report.Q2 == "on" ? true : false,
                Q3: report.Q3 == "on" ? true : false,
                Q4: report.Q4 == "on" ? true : false,
                Q5: report.Q5 == "on" ? true : false,
                N1: report.N1,
                N2: report.N2,
                N3: report.N3,
                N4: report.N4,
                N5: report.N5
            }
        })
        res.render('ppmReportTable', {
            layout: "ChefServiceLayout", pageTitle: 'PPM',
            Reports: true, reports: reps, hasReports: reps.length > 0, rep: true
        })

    }).catch(err => {
        res.render('error', { layout: false, pageTitle: 'Error', href: '/home', message: 'Sorry !!! Could Not Get Reports' })

    })
}
exports.dailyInspection = (req, res) => {
    DailyInspection.findAll({ include: [{ model: Equipment }, { model: Technicien }] })
        .then(reports => {
            const reps = reports.map(report => {
                return {
                    Code: report.Code,
                    DATE: report.DATE,
                    Tech: report.Technicien.FName + ' ' + report.Technicien.LName,
                    Equipment: report.Equipment.Name,
                    eq: true,
                    EquipmentModel: report.Equipment.Model
                }

            })
            res.render('dialyinspectionTable', {
                layout: "ChefServiceLayout", pageTitle: 'Daily Inspection',
                Reports: true, eq: true, reports: reps, hasReports: reps.length > 0
            })
        }).catch(err => {
            res.render('error', { layout: false, pageTitle: 'Error', href: '/', message: 'Sorry !!! Could Not Get Report' })

        })

}
exports.diagnosticRep = (req, res) => {
    Problem.findAll({ include: [{ model: Equipment }, { model: Technicien }] })
        .then(reports => {
            const reps = reports.map(report => {
                return {
                    Code: report.Code,
                    DATE: report.DATE,
                    Tech: report.Technicien.FName + ' ' + report.Technicien.LName,
                    Equipment: report.Equipment.Name,
                    eq: true,
                    EquipmentModel: report.Equipment.Model
                }

            })
            res.render('diagnosticsTable', {
                layout: "ChefServiceLayout", pageTitle: 'Diagnostics',
                Reports: true, eq: true, reports: reps, hasReports: reps.length > 0
            })
        }).catch(err => {
            res.render('error', { layout: false, pageTitle: 'Error', href: '/', message: 'Sorry !!! Could Not Get Report' })

        })

}
// end reports

exports.workorder = (req, res) => {
    id = req.session.ID
    WorkOrder.findAll({ where: { TechnicienID: id } }).then(orders => {
        var events = orders.map(order => {
            return {
                title: order.Description,
                color: order.Priority == 'Low' ? 'green' : order.Priority == 'High' ? 'red' : 'blue',
                start: (order.StartDate.split('-')[0] + '-' + order.StartDate.split('-')[1] + '-' + order.StartDate.split('-')[2]) + ' ' + '00:00:00Z',
                end: (order.EndDate.split('-')[0] + '-' + order.EndDate.split('-')[1] + '-' + order.EndDate.split('-')[2]) + ' ' + '23:00:00Z',
                url: '/technicien/workOrder/description/' + order.Code
            }

        })

        Technicien.findByPk(TechID).then(tech => {
            const Tech = {
                Image: tech.Image,
                FName: tech.FName,
                LName: tech.LName
            }

            res.render('calender', { layout: false, WO: true, events: events, pageTitle: 'calender', Tech: Tech })
        })

    }).catch(err => {
        res.render('error', { layout: false, pageTitle: 'Error', href: '/', message: 'Sorry !!! Could Not Get Orders' })

    })

}

exports.workorderDescription = (req, res) => {
    code = req.params.code
    TechID = req.session.ID
    WorkOrder.findOne({ where: { Code: code }, include: [{ model: Equipment }] }).then(order => {
        var order = {
            Code: order.Code,
            EquipmentName: order.Equipment.Name,
            EquipmentModel: order.Equipment.Model,
            EquipmentCode: order.Equipment.Code,
            Priority: order.Priority,
            Cost: order.Cost,
            StartDate: order.StartDate,
            EndDate: order.EndDate,
            Description: order.Description

        }
        Technicien.findByPk(TechID).then(tech => {
            const Tech = {
                Image: tech.Image,
                FName: tech.FName,
                LName: tech.LName
            }
            res.render('workOrderDetails', {
                layout: 'TechnicienLayout', pageTitle: 'Work Order',
                WO: true, order: order, Tech, Tech
            })
        })
    }).catch(err => {
        res.render('error', { layout: false, pageTitle: 'Error', href: '/', message: 'Sorry !!! Could Not Get Work Orders' })

    })
}





