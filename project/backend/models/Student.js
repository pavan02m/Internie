const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: { type: String, required: true },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College'
    },
    resume: { type: String },  // Resume URL or file path
    isPremium: { type: Boolean, default: false }
});

module.exports = Student = mongoose.model('Student', StudentSchema);
