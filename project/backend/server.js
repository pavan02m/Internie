const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// Load config
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
