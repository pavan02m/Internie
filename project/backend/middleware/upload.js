const multer = require('multer');
const path = require('path');

// Multer configuration for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Directory to store uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));  // File naming convention
    }
});

// File filter to only allow CSV files
const csvFilter = function (req, file, cb) {
    if (file.mimetype === 'text/csv') {
        cb(null, true);
    } else {
        cb(new Error('Please upload only CSV files.'), false);
    }
};

// Multer upload config
const upload = multer({
    storage: storage,
    fileFilter: csvFilter
});

module.exports = upload;
