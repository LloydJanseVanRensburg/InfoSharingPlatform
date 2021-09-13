const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Faculty = sequelize.define('faculty', {
  displayName: {
    type: Sequelize.STRING,
  },
});

module.exports = Faculty;
