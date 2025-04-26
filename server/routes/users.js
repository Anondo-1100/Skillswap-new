const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-default-secret',
            { expiresIn: '24h' }
        );

        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-default-secret',
            { expiresIn: '24h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
    try {
        // Add error logging
        console.log('Fetching user profile:', req.userId);

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get specific user's profile
router.get('/:userId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password -email');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update user profile
router.patch('/profile', auth, async (req, res) => {
    try {
        const updates = req.body;
        delete updates.password; // Prevent password update through this route

        const user = await User.findByIdAndUpdate(
            req.userId,
            updates,
            { new: true, runValidators: true }
        ).select('-password');

        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Add or update skills
router.patch('/skills', auth, async (req, res) => {
    try {
        const { skillsOffered, skillsWanted } = req.body;
        const user = await User.findById(req.userId);

        if (skillsOffered) user.skillsOffered = skillsOffered;
        if (skillsWanted) user.skillsWanted = skillsWanted;

        await user.save();
        res.json({ skillsOffered: user.skillsOffered, skillsWanted: user.skillsWanted });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Search users by skills
router.get('/search', async (req, res) => {
    try {
        const { skill, type } = req.query;
        let query = {};

        if (type === 'offered') {
            query = { 'skillsOffered.name': new RegExp(skill, 'i') };
        } else if (type === 'wanted') {
            query = { 'skillsWanted.name': new RegExp(skill, 'i') };
        }

        const users = await User.find(query).select('-password');
        res.json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;