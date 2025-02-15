const mongoose = require('mongoose');
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Hashing password before saving to database
UserSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

// Compare input password with stored hashed password
UserSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const userModel = mongoose.model('User', UserSchema);
module.exports = userModel;