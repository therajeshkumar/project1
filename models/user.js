const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: false },
    isAdmin: { type: Boolean, default: false, required: false }
});
const User = mongoose.model('User', userSchema);
exports.User = User; 