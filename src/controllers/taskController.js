// CRUD operations for Tasks
import taskModel from '../models/taskModel';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const PORT = 5000;

app.use(bodyParser.json());

// Find/Load all tasks 
app.get('/', (req, res) => {
    
});
// Create new task
app.post('/tasks', async (req, res) => {
    try {
        const newTask = new taskModel({
            title: req.body.title,
            status: req.body.status,
            priority: req.body.priority,
            deadline: req.body.deadline
        });
        // saved new task to MongoDB
        const savedTask = await newTask.save();
        // Send response with created saved task
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});
// Update task
app.put('/tasks', async (req, res) => {
    try {

    } catch (err) {
        
    }
});

app.listen(PORT, () => {
    console.log('listening on port 5000');
})