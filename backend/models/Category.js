const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensure no duplicate categories
        trim: true,
    },
    icon: {
        type: String,
        required: true,
    },
    isSystemDefault: {
        type: Boolean,
        default: false, // True if it's a system-provided category
    }
}, { timestamps: true });

const categoryModel = mongoose.model('Category', CategorySchema);
module.exports = categoryModel;
