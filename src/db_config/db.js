
// Database Connection
const { MongoClient } = require('mongodb');
const dotenv = require('./dotenv');

const url = dotenv.MONGO_URI;
const client = new MongoClient(url);

let db;

async function dbConnection() {
    try {
        await client.connect();
        console.log("Connected to the database");

        // Choose Database name
        db = client.db('task_management');

    } catch (error) {
        console.error("Error: ", error);
    } 
};

// This returns the database instance, 
function getDb() {
    if(!db) {
        throw new Error('Database not connected');
    }
    return db;
}

module.exports = {
    client,
    dbConnection,
    getDb,
};
