const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const Faculty = require('./FacultyModel');

const InstitutionalDeadline = sequelize.define('institutionaldeadline', {
  deadlineDate: {
    type: Sequelize.DATE,
  },
  description: {
    type: Sequelize.STRING,
  },
});

module.exports = InstitutionalDeadline;
