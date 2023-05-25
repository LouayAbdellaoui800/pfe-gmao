const Sequelize=require('sequelize');
const sequelize=require('../util/db.js');


const Work_order=sequelize.define('WorkOrder',{
Code:{
    type:Sequelize.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
},
StartDate:{
    type:Sequelize.TEXT,
    allowNull:false
},
EndDate:{
    type:Sequelize.TEXT,
    allowNull:false
},
Description:{
    type:Sequelize.TEXT,
    allowNull:false
},
Priority:{
    type:Sequelize.STRING,
    allowNull:false
},
Etat:{
    type:Sequelize.STRING,
    allowNull:false
}

})
module.exports=Work_order