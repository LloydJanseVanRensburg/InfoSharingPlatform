const express = require('express');
const enrolmentStrategyControllers = require('../controllers/enrolmentStrategyControllers');
const uploader = require('../middleware/fileUpload');
const router = express.Router();

router
  .route('/')
  .get(enrolmentStrategyControllers.getAllEnrolmentStrategies)
  .post(
    uploader.single('pdf'),
    enrolmentStrategyControllers.createEnrolmentStrategy
  );

router
  .route('/faculty/:id')
  .get(enrolmentStrategyControllers.getAllFacultyEnrolmentStrategies);

router
  .route('/:id')
  .get(enrolmentStrategyControllers.getEnrolmentStrategyById)
  .put(
    uploader.single('pdf'),
    enrolmentStrategyControllers.updateEnrolmentStrategyById
  )
  .delete(enrolmentStrategyControllers.deleteEnrolmentStrategyById);

module.exports = router;
