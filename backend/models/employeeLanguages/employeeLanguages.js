const Sequelize = require('sequelize');
const sequelize = require('../../utils/database');

const EmployeeLanguages = sequelize.define('employee_languages', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = EmployeeLanguages;