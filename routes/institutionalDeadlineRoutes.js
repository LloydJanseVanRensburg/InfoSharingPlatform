const express = require('express');
const institutionalDeadlinesControllers = require('../controllers/InstitutionalDeadlineControllers');
const router = express.Router();

router
  .route('/')
  .get(institutionalDeadlinesControllers.getAllInstitutionalDeadlines)
  .post(institutionalDeadlinesControllers.createInstitutionalDeadline);

router
  .route('/:id')
  .get(institutionalDeadlinesControllers.getInstitutionalDeadlineById)
  .put(institutionalDeadlinesControllers.updateInstitutionalDeadlineById)
  .delete(institutionalDeadlinesControllers.deleteInstitutionalDeadlineById);

module.exports = router;
