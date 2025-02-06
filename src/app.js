import express from 'express';
import cors from 'cors';
import taskRoute from './routes/taskRoute.js';
import userRoute from './routes/userRoute.js';
const { connectDB } = require('./db_config/db.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Routes
app.use('/api/user', userRoute);
app.use('/api/tasks', taskRoute);



app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });