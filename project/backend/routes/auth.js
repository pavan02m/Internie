const express = require('express');
const router = express.Router();
const { registerStudent, registerCollege, registerCompany, login } = require('../controllers/authController');

// Register as Student
router.post('/register/student', registerStudent);

// Register as College
router.post('/register/college', registerCollege);

// Register as Company
router.post('/register/company', registerCompany);

// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', login);

module.exports = router;
