const Sequelize = require('sequelize');
const sequelize = require('../util/db.js');


const Spare_part = sequelize.define('SpareParts', {
    Code: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement : true
    },
    SerialNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Image: {
        type: Sequelize.STRING,
        allowNull: true
    }


})
module.exports = Spare_part