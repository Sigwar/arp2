const Sequelize = require('sequelize');
const sequelize = require('../../utils/database');

const Levels = sequelize.define('levels', {
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

module.exports = Levels;