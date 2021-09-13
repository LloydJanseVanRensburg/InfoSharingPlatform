const express = require('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();

router.get('/', userControllers.getAllUsers);
router.get('/me', userControllers.getLoggedInUser);

router.post('/login', userControllers.loginUser);
router.post('/register', userControllers.registerUser);

router
  .route('/:id')
  .get(userControllers.getUserById)
  .put(userControllers.updateUserById)
  .delete(userControllers.deleteUserById);

module.exports = router;
