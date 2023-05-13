const Sequelize=require('sequelize');
const sequelize=require('../util/db.js');


const Problem=sequelize.define('PROBLEM',{
Code:{
    type:Sequelize.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
},
DATE:{
   type:Sequelize.STRING,
   allowNull:false 
},
DETAILS:{
    type:Sequelize.STRING,
    allowNull:false,
}
})
module.exports=Problem