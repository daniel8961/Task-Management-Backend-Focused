import dotenv from './dotenv';

// Database Connection
const { MongoClient } = require('mongodb');
const url = dotenv.MONGO_URI;

const client = new MongoClient(url);

async function dbConnection() {
    try {
        await client.connect();
        console.log("Connected to the database");

        // Choose Database name
        const db = client.db('task_management');

    } catch (error) {
        console.error("Error: ", error);
    } finally {
        await client.close();
    }
};

module.exports = {
    client,
    dbConnection,
};
