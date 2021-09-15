const express = require('express');
const industyDataControllers = require('../controllers/industyDataControllers');
const uploader = require('../middleware/fileUpload');
const router = express.Router();

router
  .route('/')
  .get(industyDataControllers.getAllIndustryData)
  .post(uploader.single('pdf'), industyDataControllers.createIndustryData);

router
  .route('/faculty/:id')
  .get(industyDataControllers.getAllFacultyIndustryData);

router
  .route('/:id')
  .get(industyDataControllers.getIndustryDataById)
  .put(uploader.single('pdf'), industyDataControllers.updateIndustryDataById)
  .delete(industyDataControllers.deleteIndustryDataById);

module.exports = router;
