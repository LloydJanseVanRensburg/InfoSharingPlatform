const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

// User.sync();

module.exports = User;
