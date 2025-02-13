import express from 'express';
import cors from 'cors';
const { connectDB } = require('./db_config/db.js');

import taskRoute from './routes/taskRoute.js';
import userRoute from './routes/userRoute.js';
import subtaskRoute from './routes/subtaskRoute.js';
import categoryRoute from './routes/categoryRoute.js';
const { seedCategories } = require('./controllers/categoryController.js');

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
app.use('/api/subtask', subtaskRoute);
app.use('/api/category', categoryRoute);
seedCategories(); // Seed system default categories



app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });