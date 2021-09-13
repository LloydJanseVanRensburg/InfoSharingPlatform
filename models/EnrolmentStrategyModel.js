const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const Faculty = require('./FacultyModel');

const EnrolmentStrategy = sequelize.define('enrolmentstrategy', {
  pdfUrl: {
    type: Sequelize.TEXT,
  },
});

EnrolmentStrategy.Faculty = EnrolmentStrategy.belongsTo(Faculty);

module.exports = EnrolmentStrategy;
