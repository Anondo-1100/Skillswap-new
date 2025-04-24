const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Send a message
router.post('/', auth, async (req, res) => {
    try {
        const { recipientId, content } = req.body;

        // Verify recipient exists
        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({ message: 'Recipient not found' });
        }

        const message = new Message({
            sender: req.userId,
            recipient: recipientId,
            content: content.trim()
        });

        await message.save();
        
        // Populate sender and recipient information
        await message.populate([
            { path: 'sender', select: 'username' },
            { path: 'recipient', select: 'username' }
        ]);

        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get conversations (unique users the current user has messaged with)
router.get('/conversations', auth, async (req, res) => {
    try {
        // Get all messages involving the current user
        const messages = await Message.find({
            $or: [
                { sender: req.userId },
                { recipient: req.userId }
            ]
        })
        .sort('-createdAt')
        .populate('sender', 'username')
        .populate('recipient', 'username');

        // Get unique conversations with last message and unread count
        const conversations = [];
        const processedUsers = new Set();

        messages.forEach(msg => {
            const otherUser = msg.sender._id.toString() === req.userId 
                ? msg.recipient 
                : msg.sender;
            
            const otherUserId = otherUser._id.toString();
            
            if (!processedUsers.has(otherUserId)) {
                processedUsers.add(otherUserId);
                
                // Count unread messages from this user
                const unreadCount = messages.filter(m => 
                    m.sender._id.toString() === otherUserId &&
                    m.recipient._id.toString() === req.userId &&
                    !m.read
                ).length;

                conversations.push({
                    user: otherUser,
                    lastMessage: msg.content,
                    timestamp: msg.createdAt,
                    unread: unreadCount
                });
            }
        });

        // Sort conversations by timestamp
        conversations.sort((a, b) => b.timestamp - a.timestamp);

        res.json(conversations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get messages between current user and another user
router.get('/:userId', auth, async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.userId, recipient: req.params.userId },
                { sender: req.params.userId, recipient: req.userId }
            ]
        })
        .sort('createdAt')
        .populate('sender', 'username')
        .populate('recipient', 'username');

        // Mark messages as read in a separate operation
        await Message.updateMany(
            { 
                sender: req.params.userId, 
                recipient: req.userId,
                read: false
            },
            { read: true }
        );

        res.json(messages);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get unread message count
router.get('/unread/count', auth, async (req, res) => {
    try {
        const count = await Message.countDocuments({
            recipient: req.userId,
            read: false
        });
        
        res.json({ count });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a message
router.delete('/:messageId', auth, async (req, res) => {
    try {
        const message = await Message.findOne({
            _id: req.params.messageId,
            sender: req.userId
        });

        if (!message) {
            return res.status(404).json({ message: 'Message not found or unauthorized' });
        }

        await message.deleteOne();
        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;