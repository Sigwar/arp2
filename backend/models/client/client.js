const Sequelize = require('sequelize');
const sequelize = require('../../utils/database');

const Client = sequelize.define('client', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Client;