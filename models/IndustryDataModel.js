const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const Faculty = require('./FacultyModel');

const IndustryData = sequelize.define('industrydata', {
  pdfUrl: {
    type: Sequelize.TEXT,
  },
});

IndustryData.Faculty = IndustryData.belongsTo(Faculty);

module.exports = IndustryData;
