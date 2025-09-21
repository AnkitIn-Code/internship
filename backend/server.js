const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/internships', require('./routes/internship'));
app.use('/api/recommendations', require('./routes/recommend'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/user', require('./routes/user'));
app.use('/api/applications', require('./routes/applications'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!', status: 'OK' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
