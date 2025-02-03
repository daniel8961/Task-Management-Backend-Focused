// Task.js
require('dotenv').config();

// Database Connection
const { MongoClient } = require('mongodb');
const url = process.env.MongoDB_Connection_String;

const client = new MongoClient(url);

async function dbConnection() {
    try {
        await client.connect();
        console.log("Connected to the database");

        const db = client.db('task_management');
        const dbCollection = db.collection('TMJ');

        const newUser = { username: 'admin', password: 123456 };
        const result = await dbCollection.insertOne(newUser);

    } catch (error) {
        console.error("Error: ", error);
    } finally {
        await client.close();
    }
};

// Authenticate User Data for Sign up

// Authenticate User Data for Login 

// Verify Form Data
const usernameField = document.getElementById('username');
const usernameMsgField = document.getElementById('username-error');
usernameField.addEventListener('input', (e) => {
    const username = usernameField.value.trim(); 
    const regexPattern = /^[a-zA-Z0-9_]{3,16}$/;

    if (regexPattern.test(username)) {
        usernameMsgField.textContent = 'Valid Username';
        usernameMsgField.style.color = 'green';
    } else {
        usernameMsgField.textContent = 'Invalid Username';
        usernameMsgField.style.color = 'red';
    }
});
const passwordField = document.getElementById('password');
const passwordMsgField = document.getElementById('password-error'); 
passwordField.addEventListener('input', e => {
    const password = passwordField.value.trim();
    const regexPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,16}$/;

    if (regexPattern.test(password)) {
        passwordMsgField.textContent = 'Valid Password';
        passwordMsgField.style.color = 'green';
    } else {
        passwordMsgField.textContent = 'Invalid Password';
        passwordMsgField.style.color = 'red';
    }
});



