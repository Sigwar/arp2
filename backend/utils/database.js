const Sequelize = require('sequelize');

const sequelize = new Sequelize('hrp', 'root', 'eQ89rGn!lI06', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;