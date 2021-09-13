const express = require('express');
const historicPerformanceDataControllers = require('../controllers/historicPerformanceDataControllers');
const router = express.Router();

router
  .route('/')
  .get(historicPerformanceDataControllers.getAllHistoricPerformanceData)
  .post(historicPerformanceDataControllers.createHistoricPerformanceData);

router
  .route('/:id')
  .get(historicPerformanceDataControllers.getHistoricPerformanceDataById)
  .put(historicPerformanceDataControllers.updateHistoricPerformanceDataById)
  .delete(historicPerformanceDataControllers.deleteHistoricPerformanceDataById);

module.exports = router;
