const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const Faculty = require('./FacultyModel');

const HistoricPerformanceData = sequelize.define('historicperformancedata', {
  pdfUrl: {
    type: Sequelize.TEXT,
  },
});

HistoricPerformanceData.Faculty = HistoricPerformanceData.belongsTo(Faculty);

module.exports = HistoricPerformanceData;
