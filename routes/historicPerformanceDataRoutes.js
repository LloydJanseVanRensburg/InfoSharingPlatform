const express = require('express');
const historicPerformanceDataControllers = require('../controllers/historicPerformanceDataControllers');
const uploader = require('../middleware/fileUpload');
const HistoricPerformanceData = require('../models/HistoricPerformanceDataModel');
const router = express.Router();

router
  .route('/')
  .get(historicPerformanceDataControllers.getAllHistoricPerformanceData)
  .post(
    uploader.single('pdf'),
    historicPerformanceDataControllers.createHistoricPerformanceData
  );

router
  .route('/faculty/:id')
  .get(historicPerformanceDataControllers.getAllFacultyHistoricPerformance);

router
  .route('/:id')
  .get(historicPerformanceDataControllers.getHistoricPerformanceDataById)
  .put(
    uploader.single('pdf'),
    historicPerformanceDataControllers.updateHistoricPerformanceDataById
  )
  .delete(historicPerformanceDataControllers.deleteHistoricPerformanceDataById);

module.exports = router;
