const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    deadline: {
        type: Date,
        required: false,
    }, 
    notificationTimes: [{
        type: Number,
    }]
}, { timestamps: true });

const taskModel = mongoose.model('Task', TaskSchema);
module.exports = taskModel;