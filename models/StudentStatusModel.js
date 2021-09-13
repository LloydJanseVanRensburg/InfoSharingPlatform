const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const Faculty = require('./FacultyModel');

const StudentStatus = sequelize.define('studentstatus', {
  acceptedStudents: {
    type: Sequelize.INTEGER,
  },
  bursaryStudents: {
    type: Sequelize.INTEGER,
  },
  highAPSStudents: {
    type: Sequelize.INTEGER,
  },
  hostelAcceptanceStudents: {
    type: Sequelize.INTEGER,
  },
});

StudentStatus.Faculty = StudentStatus.belongsTo(Faculty);

module.exports = StudentStatus;
