const Sequelize = require('sequelize');

const sequelize = new Sequelize('hrp', 'root', 'admin', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;