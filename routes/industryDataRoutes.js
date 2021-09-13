const express = require('express');
const industyDataControllers = require('../controllers/industyDataControllers');
const router = express.Router();

router
  .route('/')
  .get(industyDataControllers.getAllIndustryData)
  .post(industyDataControllers.createIndustryData);

router
  .route('/:id')
  .get(industyDataControllers.getIndustryDataById)
  .put(industyDataControllers.updateIndustryDataById)
  .delete(industyDataControllers.deleteIndustryDataById);

module.exports = router;
