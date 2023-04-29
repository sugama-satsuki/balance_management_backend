const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 25
    },
    password: {
        type: String,
        required: true,
        min: 5,
        max: 30
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 50
    }
});

module.exports = mongoose.model('User', UserSchema);