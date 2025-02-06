const userModel = require('../models/User.js');


// Register User
const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const isExisted = await userModel.findOne({ username });
        if (isExisted) {
            return res.status(400).json({ success: false, message: 'Username is taken' });
        }

        // Create new user (Password is automatically hashed due to schema pre-save middleware)
        const newUser = new userModel({ username, password });
        await newUser.save();

        res.status(201).json({ success: true, message: "Registration successful." });

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
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Compare input password with hashed password in DB
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Incorrect password" });
        }

        res.status(200).json({ success: true, message: "Login successful", user });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Login failed" });
    }
};


export { registerUser, loginUser };
