const User = require('../models/User');

const trackActivity = async (req, res, next) => {
    try {
        if (req.userId) {
            const user = await User.findById(req.userId);
            if (user) {
                // Only update if last active was more than 5 minutes ago
                const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
                if (!user.lastActive || user.lastActive < fiveMinutesAgo) {
                    await user.updateLastActive();
                }
            }
        }
        next();
    } catch (error) {
        // Don't block the request if activity tracking fails
        console.error('Activity tracking error:', error);
        next();
    }
};

module.exports = trackActivity;