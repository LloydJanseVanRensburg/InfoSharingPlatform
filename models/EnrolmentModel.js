const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const Faculty = require('./FacultyModel');

const Enrolment = sequelize.define('enrolment', {
  firstTimeUnderGrads: {
    type: Sequelize.INTEGER,
  },
  totalUnderGrads: {
    type: Sequelize.INTEGER,
  },
  postGradsToMasters: {
    type: Sequelize.INTEGER,
  },
  masters: {
    type: Sequelize.INTEGER,
  },
  doctors: {
    type: Sequelize.INTEGER,
  },
  totalPostGrads: {
    type: Sequelize.INTEGER,
  },
  occasionalStudents: {
    type: Sequelize.INTEGER,
  },
});

Enrolment.Faculty = Enrolment.belongsTo(Faculty);

module.exports = Enrolment;
