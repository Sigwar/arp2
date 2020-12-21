const Sequelize = require('sequelize');
const sequelize = require('../../utils/database');

const Activities = sequelize.define('activities', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },

});

module.exports = Activities;