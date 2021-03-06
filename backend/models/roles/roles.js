const Sequelize = require('sequelize');
const sequelize = require('../../utils/database');

const Roles = sequelize.define('roles', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

});

module.exports = Roles;