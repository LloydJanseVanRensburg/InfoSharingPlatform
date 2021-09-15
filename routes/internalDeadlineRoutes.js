const express = require('express');
const internalDeadlineControllers = require('../controllers/internalDeadlineControllers');
const router = express.Router();

router
  .route('/')
  .get(internalDeadlineControllers.getAllInternalDeadlines)
  .post(internalDeadlineControllers.createInternalDeadline);

router
  .route('/faculty/:id')
  .get(internalDeadlineControllers.getAllFacultyInternalDeadlines);

router
  .route('/:id')
  .get(internalDeadlineControllers.getInternalDeadlineById)
  .put(internalDeadlineControllers.updateInternalDeadlineById)
  .delete(internalDeadlineControllers.deleteInternalDeadlineById);

module.exports = router;
