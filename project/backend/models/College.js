const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    studentHeads: [
        {
            course: String,
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }
        }
    ],
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = College = mongoose.model('College', CollegeSchema);
