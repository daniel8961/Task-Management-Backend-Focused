import express from 'express';
import { createTask, readAllTask, readTaskByID, updateTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

// Calls the controller function
router.post('/', createTask); 
router.get('/', readAllTask); 
router.get('/:id', readTaskByID);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
