const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    skillsOffered: [{
        name: String,
        proficiency: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
            default: 'Intermediate'
        },
        description: String
    }],
    skillsWanted: [{
        name: String,
        description: String
    }],
    bio: {
        type: String,
        maxLength: 500
    },
    location: String,
    lastActive: {
        type: Date,
        default: Date.now
    },
    joinedDate: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to check password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Method to update last active timestamp
userSchema.methods.updateLastActive = async function () {
    this.lastActive = new Date();
    return this.save();
};

const User = mongoose.model('User', userSchema);
module.exports = User;