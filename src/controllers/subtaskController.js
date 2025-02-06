// Manages CRUD operations for Subtasks
const subtaskModel = require('../models/Subtask');


// Create new subtask
const createSubtask = async (req, res) => {
    try {
        const newSubtask = new subtaskModel({
            title: req.body.title,
            status: req.body.status,
            priority: req.body.priority,
        });
        // saved new subtask to MongoDB
        const savedSubtask = await newSubtask.save();
        // Send response with created saved subtask
        res.status(201).json(savedSubtask);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Read/Load all subtasks
const readAllSubtask = async (req, res) => {
    try {
        const subtasks = await subtaskModel.find();
        res.status(200).json(subtasks);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};
// Read a single subtask by specific ID - ID is automatically generated by MongoDB
const readSubtaskByID = async (req, res) => {
    try {
        const subtask = await subtaskModel.findById(req.params.id);
        res.status(200).json(subtask);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Update subtask
const updateSubtask = async (req, res) => {
    try {
        const updatedSubtask = await subtaskModel.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                status: req.body.status,
                priority: req.body.priority,
            },
            { new: true }
        );
        if(!updatedSubtask) {
            return res.status(404).json({error: 'Subtask not found'});
        }
        res.status(200).json(updatedSubtask);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Delete subtask
const deleteSubtask = async (req, res) => {
    try {
        const deletedSubtask = await subtaskModel.findByIdAndDelete(req.params.id);
        if(!deletedSubtask) {
            return res.status(404).json({error: 'Subtask not found'});
        }
        res.status(200).json(deletedSubtask);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

module.exports = { createSubtask, readAllSubtask, readSubtaskByID, updateSubtask, deleteSubtask };