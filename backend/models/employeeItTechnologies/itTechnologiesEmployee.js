const Sequelize = require('sequelize');
const sequelize = require('../../utils/database');

const EmployeeItTechnologies = sequelize.define('employee_it_technologies', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = EmployeeItTechnologies;