const express = require('express');
const enrolmentStrategyControllers = require('../controllers/enrolmentStrategyControllers');
const router = express.Router();

router
  .route('/')
  .get(enrolmentStrategyControllers.getAllEnrolmentStrategies)
  .post(enrolmentStrategyControllers.createEnrolmentStrategy);

router
  .route('/:id')
  .get(enrolmentStrategyControllers.getEnrolmentStrategyById)
  .put(enrolmentStrategyControllers.updateEnrolmentStrategyById)
  .delete(enrolmentStrategyControllers.deleteEnrolmentStrategyById);

module.exports = router;
