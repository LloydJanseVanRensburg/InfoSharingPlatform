const express = require('express');
const studentStatusControllers = require('../controllers/studentStatusControllers');
const router = express.Router();

router
  .route('/')
  .get(studentStatusControllers.getAllStudentStatuses)
  .post(studentStatusControllers.createStudentStatus);

router
  .route('/faculty/:id')
  .get(studentStatusControllers.getAllFacultyStudentStatuses);

router
  .route('/:id')
  .get(studentStatusControllers.getStudentStatusById)
  .put(studentStatusControllers.updateStudentStatusById)
  .delete(studentStatusControllers.deleteStudentStatusById);

module.exports = router;
