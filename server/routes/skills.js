const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Add a skill that user can teach
router.post('/offer', auth, async (req, res) => {
    try {
        const { name, proficiency, description } = req.body;
        const user = await User.findById(req.user.id);
        
        user.skillsOffered.push({
            name,
            proficiency,
            description
        });
        
        await user.save();
        res.json(user.skillsOffered);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a skill that user wants to learn
router.post('/want', auth, async (req, res) => {
    try {
        const { name, description } = req.body;
        const user = await User.findById(req.user.id);
        
        user.skillsWanted.push({
            name,
            description
        });
        
        await user.save();
        res.json(user.skillsWanted);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Remove an offered skill
router.delete('/offer/:skillId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.skillsOffered = user.skillsOffered.filter(
            skill => skill._id.toString() !== req.params.skillId
        );
        await user.save();
        res.json(user.skillsOffered);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Remove a wanted skill
router.delete('/want/:skillId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.skillsWanted = user.skillsWanted.filter(
            skill => skill._id.toString() !== req.params.skillId
        );
        await user.save();
        res.json(user.skillsWanted);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Search for users by skills
router.get('/search', async (req, res) => {
    try {
        const { skill } = req.query;
        const users = await User.find({
            'skillsOffered.name': { $regex: skill, $options: 'i' }
        }).select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;