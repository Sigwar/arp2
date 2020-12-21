const Sequelize = require('sequelize');
const sequelize = require('../../utils/database');

const EmployeeProjects = sequelize.define('employee_projects', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  uuid: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dateStart: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  dateEnd: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = EmployeeProjects;