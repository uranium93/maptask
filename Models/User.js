const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    userName: {
        type: String,
        default: 'user'
    }
});

module.exports = User = mongoose.model('user', UserSchema);