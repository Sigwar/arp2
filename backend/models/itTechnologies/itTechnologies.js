const Sequelize = require('sequelize');
const sequelize = require('../../utils/database');

const ItTechnologies = sequelize.define('it_technologies', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = ItTechnologies;