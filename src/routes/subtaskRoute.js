import express from 'express';
import { createSubtask, readAllSubtask, readSubtaskByID, updateSubtask, deleteSubtask } from '../controllers/subtaskController.js';

const router = express.Router();

// Calls the controller function
router.post('/', createSubtask);
router.get('/', readAllSubtask);
router.get('/:id', readSubtaskByID);
router.put('/:id', updateSubtask);
router.delete('/:id', deleteSubtask);

export default router;