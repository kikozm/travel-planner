const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// רישום משתמש
router.post('/register', authController.registerUser);
// התחברות
router.post('/login', authController.loginUser);

module.exports = router;
