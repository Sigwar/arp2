const Sequelize = require('sequelize');
const sequelize = require('../../utils/database');

const Certificates = sequelize.define('certificates', {
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
  credentialId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = Certificates;