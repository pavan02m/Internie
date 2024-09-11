const express = require('express');
const router = express.Router();
const { registerCollege, appointStudentHead, addStudent, bulkAddStudents, getInternshipDetails } = require('../controllers/collegeController');
const auth = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); 

// Appoint Student Head (Only authenticated colleges)
router.post('/appoint-student-head', auth, authorizeRoles('college'), appointStudentHead);

// Add individual student (Only authenticated colleges)
router.post('/add-student', auth, authorizeRoles('college'), addStudent);

// Bulk add students (Only authenticated colleges)
router.post('/bulk-add-students', auth, authorizeRoles('college'), upload.single('file'), bulkAddStudents);

// Request internship details from companies (Only authenticated colleges)
router.get('/internship-details', auth, authorizeRoles('college'), getInternshipDetails);

module.exports = router;
