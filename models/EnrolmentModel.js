const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const Faculty = require('./FacultyModel');

const Enrolment = sequelize.define('enrolment', {
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

Enrolment.Faculty = Enrolment.belongsTo(Faculty);

module.exports = Enrolment;
