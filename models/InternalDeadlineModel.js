const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const Faculty = require('./FacultyModel');

const InternalDeadline = sequelize.define('internaldeadline', {
  deadlineDate: {
    type: Sequelize.DATE,
  },
  description: {
    type: Sequelize.STRING,
  },
});

InternalDeadline.Faculty = InternalDeadline.belongsTo(Faculty);

module.exports = InternalDeadline;
