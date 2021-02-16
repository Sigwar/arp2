const Sequelize = require('sequelize');
const sequelize = require('../../utils/database');

const Educations = sequelize.define('educations', {
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
  schoolName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
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

module.exports = Educations;