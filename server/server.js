const express = require('express');
const admin = require('./config/firebase.admin');
const { auth } = require('./middleware/auth');
const trackActivity = require('./middleware/activity');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const skillRoutes = require('./routes/skills');
const messageRoutes = require('./routes/messages');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
    credentials: true
}));
app.use(express.json());

// Apply auth middleware to protected routes
app.use('/api/users/:userId', auth);
app.use('/api/skills', auth);
app.use('/api/messages', auth);

// Apply activity tracking after auth
app.use('/api/users/:userId', trackActivity);
app.use('/api/skills', trackActivity);
app.use('/api/messages', trackActivity);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/messages', messageRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/skillswap')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to SkillSwap API' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});