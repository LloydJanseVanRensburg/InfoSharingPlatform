const express = require('express');
const historicPerformanceDataControllers = require('../controllers/historicPerformanceDataControllers');
const uploader = require('../middleware/fileUpload');
const router = express.Router();

router
  .route('/')
  .get(historicPerformanceDataControllers.getAllHistoricPerformanceData)
  .post(
    uploader.single('pdf'),
    historicPerformanceDataControllers.createHistoricPerformanceData
  );

router
  .route('/:id')
  .get(historicPerformanceDataControllers.getHistoricPerformanceDataById)
  .put(
    uploader.single('pdf'),
    historicPerformanceDataControllers.updateHistoricPerformanceDataById
  )
  .delete(historicPerformanceDataControllers.deleteHistoricPerformanceDataById);

module.exports = router;
