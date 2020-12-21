const Sequelize = require('sequelize');
const sequelize = require('../../utils/database');

const ProjectItTechnologies = sequelize.define('project_it_technologies', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = ProjectItTechnologies;