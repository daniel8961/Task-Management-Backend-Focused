const mongoose = require('mongoose');

const SubtaskSchema = new mongoose.Schema({
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
    }],
}, { timestamps: true });

const subtaskModel = mongoose.model('Subtask', SubtaskSchema);
module.exports = subtaskModel;