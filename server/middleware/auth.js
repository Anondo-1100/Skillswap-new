const admin = require('firebase-admin');

// Middleware function for authentication
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        req.userId = decodedToken.uid;
        req.user = await admin.auth().getUser(decodedToken.uid);
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

module.exports = { auth };