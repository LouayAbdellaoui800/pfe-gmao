const Sequelize = require('sequelize');
const sequelize = require('../util/db.js');


const Equipment = sequelize.define('Equipment', {
    Code: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement : true
    },
    SerialNumber: {
        type: Sequelize.INTEGER,
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
    },
    Cost: {
        type: Sequelize.BIGINT(12),
        allowNull: false
    },
    Model: {
        type: Sequelize.STRING,
        allowNull: false
    },
    InstallationDate: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    ArrivalDate: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    LifeSpanDate: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    WarrantyDate: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    Manufacturer: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    PMP: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Notes: {
        type: Sequelize.TEXT,
        allowNull: true
    }
})
module.exports = Equipment