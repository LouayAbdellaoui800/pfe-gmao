const Sequelize = require('sequelize');
const sequelize = require('../util/db.js');



const Magazinier_gct = sequelize.define('Magazinier', {
    ID: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    FName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    LName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Phone: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        unique: true
    },
    Image: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    Adress: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Magazinier_gct;