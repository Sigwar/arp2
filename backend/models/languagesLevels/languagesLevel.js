const Sequelize = require('sequelize');
const sequelize = require('../../utils/database');

const LanguagesLevel = sequelize.define('languages_level', {
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
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = LanguagesLevel;