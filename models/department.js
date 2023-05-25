const Sequelize = require('sequelize');
const sequelize = require('../util/db.js');

const Department = sequelize.define('Department', {
    Code: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});


module.exports = Department