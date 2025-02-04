const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

export default taskModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'in progress', 'complete'],
        default: 'pending',
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    deadline: {
        type: Date,
    }
}, { Timestamp: true });

// module.exports = mongoose.model('Task', taskSchema);