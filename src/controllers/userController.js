import joi from 'joi';
import jwt from 'jsonwebtoken';
const dotenv = require('dotenv');
const userModel = require('../models/User.js');

const SECRET_KEY = dotenv.JWT_SECRET;

const userSchema = joi.object({
    username: joi.string().alphanum().min(3).max(30).required(),
    password: joi.string().min(8).required(),
});

// Register User
const registerUser = async (req, res) => {
    // validate user inputs
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });    
    }
    try {
        const { username, password } = req.body;

        // Check if user alreadxy exists
        const isExisted = await userModel.findOne({ username: String(req.body.username) });
        if (isExisted) {
            return res.status(400).json({ success: false, message: 'Username is taken' });
        }

        // Create new user (Password is automatically hashed due to schema pre-save middleware)
        const newUser = new userModel({ username, password });
        await newUser.save();

        // Generate JWT token immediately after registration and login right after signing up
        const token = jwt.sign({ _id: newUser._id }, SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ success: true, message: "Registration successful.", token });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await userModel.findOne({ username: String(req.body.username) });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Compare input password with hashed password in DB
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Incorrect password" });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '1h' });
        const { password: _, ...userWithoutPassword } = user.toObject();

        res.status(200).json({ success: true, message: "Login successful", token, user:userWithoutPassword });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Login failed" });
    }
};


export { registerUser, loginUser };
