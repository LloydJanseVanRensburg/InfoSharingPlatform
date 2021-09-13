const express = require('express');
const enrolmentControllers = require('../controllers/enrolmentControllers');
const router = express.Router();

router
  .route('/')
  .get(enrolmentControllers.getAllEnrolments)
  .post(enrolmentControllers.createEnrolment);

router
  .route('/:id')
  .get(enrolmentControllers.getEnrolmentById)
  .put(enrolmentControllers.updateEnrolmentById)
  .delete(enrolmentControllers.deleteEnrolmentById);

module.exports = router;
