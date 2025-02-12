const mongoose = require('mongoose');

const colors = ["red", "orange", "yellow", "green", "blue", "purple", "white", "brown", "black", "gray"];

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        enum: colors,
        default: 'red',
    },
    icon: {
        type: String,
        default: 'default',
    },
}, { timestamps: true });

const categoryModel = mongoose.model('Category', CategorySchema);
module.exports = categoryModel;