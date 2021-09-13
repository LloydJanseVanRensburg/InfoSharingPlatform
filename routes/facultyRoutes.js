const express = require('express');
const facultyControllers = require('../controllers/facultyControllers');
const router = express.Router();

router
  .route('/')
  .get(facultyControllers.getAllFaculties)
  .post(facultyControllers.createFaculty);

router
  .route('/:id')
  .get(facultyControllers.getFacultyById)
  .put(facultyControllers.updateFacultyById)
  .delete(facultyControllers.deleteFacultyById);

module.exports = router;
