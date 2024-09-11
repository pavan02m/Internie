const College = require('../models/College');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const College = require('../models/College');
const fs = require('fs');
const csvParser = require('csv-parser');

exports.appointStudentHead = async (req, res) => {
    const { course, studentId } = req.body;

    try {
        const college = await College.findById(req.user.id);

        if (!college) {
            return res.status(400).json({ msg: 'College not found' });
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ msg: 'Student not found' });
        }

        // Check if student already appointed as head
        const headAlreadyAppointed = college.studentHeads.find(head => head.course === course);
        if (headAlreadyAppointed) {
            return res.status(400).json({ msg: 'Student head already appointed for this course' });
        }

        // Appoint student head
        college.studentHeads.push({ course, studentId });
        await college.save();

        res.json(college.studentHeads);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.bulkAddStudents = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: 'No file uploaded. Please upload a CSV file.' });
    }

    const studentsData = [];
    const collegeId = req.user.id;

    // Stream the file and parse CSV content
    fs.createReadStream(req.file.path)
        .pipe(csvParser())
        .on('data', (row) => {
            // Collect each row (student) from the CSV
            studentsData.push({
                name: row.name,
                email: row.email,
                college: collegeId
            });
        })
        .on('end', async () => {
            try {
                // Insert the parsed students into the database
                const students = await Student.insertMany(studentsData);

                // Add student IDs to the college
                const college = await College.findById(collegeId);
                college.students.push(...students.map(student => student._id));
                await college.save();

                // Delete the file after processing
                fs.unlinkSync(req.file.path);

                res.status(201).json({ msg: 'Students added successfully!', students });
            } catch (err) {
                console.error(err.message);
                res.status(500).json({ msg: 'Server error' });
            }
        })
        .on('error', (err) => {
            console.error(err.message);
            res.status(500).json({ msg: 'Error parsing the CSV file' });
        });
};
