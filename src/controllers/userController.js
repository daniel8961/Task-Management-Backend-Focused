import { client, dbConnection } from '../db_config/db.js';

// Authenticate User Data for Sign up
async function registerUser(username, password) {
    try {
        const db = await dbConnection();
        const users = db.collection('users');

        // check if user is already registered
        const isExisted = await users.findOne({ username });
        if(isExisted) {
            return { success: false, message: 'Username is taken' };
        }

        // Insert new user
        const newUser = await users.insertOne({ 
            username,
            password,
            createdAt: new Date(),
        });
        return { 
            success: true, 
            message: "Registration successfully.",
            userId: newUser.insertedId,
        };
        
    } catch (error) {
        return { success: false, message: 'Registration failed' };
    }
}

// Authenticate User Data for Login 
async function loginUser(username, password) {
    try {
        const db = await dbConnection();
        const users = db.collection('users');

        // Find user by username
        const user = await users.findOne({ username });
        if(!user) {
            return {success: false, message: "User not found"};
        }

        // Compare password
        if(user.password !== password) {
            return {success: false, message: "Incorrect password"};
        }

        // If both username and password are matches
        return {success: true, message: "Login successful", user,};
    } catch (error) {
        return {success: false, message: "Login failed" };
    }
}


