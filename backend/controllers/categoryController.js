import mongoose from 'mongoose';
import { io } from '../server.js';
import joi from 'joi';
const { categoryModel } = require('../models/Category.js');


const systemCategories = [
    { name: "Home", icon: "IconHome" },
    { name: "Shopping", icon: "IconShoppingCart" },
    { name: "Health", icon: "IconHeart" },
    { name: "Calendar", icon: "IconCalendar" },
    { name: "Car", icon: "IconCar" },
    { name: "Book", icon: "IconBook" },
    { name: "Work", icon: "IconBriefcase" },
    { name: "Camera", icon: "IconCamera" },
    { name: "Phone", icon: "IconPhone" },
    { name: "Music", icon: "IconMusic" }
];

const categorySchema = joi.object({
    name: joi.string().min(1).max(50).required(),
    icon: joi.string().required()
});

// Seed System Default Categories (Run on Server Start)
const seedCategories = async () => {
    try {
        const count = await categoryModel.countDocuments({ isSystemDefault: true });
        if (count === 0) {
            const formattedCategories = systemCategories.map(cat => ({
                name: cat.name,
                icon: cat.icon,
                isSystemDefault: true
            }));
            await categoryModel.insertMany(formattedCategories);
            console.log("System categories added.");
        }
    } catch (error) {
        console.error("Error seeding categories:", error);
    }
};

// Fetch Available Icons from Tabler
const availableIcons = Object.keys(require('@tabler/icons'))
    .filter(icon => icon.startsWith("Icon")) // Keep only icons
    .map(icon => ({ name: icon })); // Convert into an array of { name: 'IconHome' }

// API to Fetch Available Icons
const getIcons = (req, res) => {
    res.json({ icons: availableIcons });
};

// API to Get All Categories (Both User & System)
const getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: "Error fetching categories" });
    }
};

// API to Create a New Category (User-Defined)
const createCategory = async (req, res) => {
    const { error } = categorySchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const { name, icon } = req.body;

        // Prevent duplicate category names
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ error: "Category name already exists" });
        }

        // Ensure the icon is from the predefined list
        if (!availableIcons.some(i => i.name === icon)) {
            return res.status(400).json({ error: "Invalid icon selection" });
        }

        const newCategory = new categoryModel({ name, icon });
        io.emit('categoryCreated', newCategory);
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(500).json({ error: "Error creating category" });
    }
};

// API to Read a Single Category
const readCagetoryByID = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Invalid Category ID" });
    }

    try {
        const category = await categoryModel.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        io.emit('categoryRead', category);
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: "Error fetching category" });
    }
};

// API to Update a Category (User-Created Only)
const updateCategory = async (req, res) => {
    const { error } = categorySchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const { id } = req.params;
        const { name, icon } = req.body;
        const category = await categoryModel.findById(id);

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        if (category.isSystemDefault) {
            return res.status(403).json({ error: "Cannot update system categories" });
        }

        // Prevent duplicate category names
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory && existingCategory.id !== id) {
            return res.status(400).json({ error: "Category name already exists" });
        }

        // Ensure the icon is from the predefined list
        if (!availableIcons.some(i => i.name === icon)) {
            return res.status(400).json({ error: "Invalid icon selection" });
        }

        const updatedCategory = await categoryModel.findByIdAndUpdate(id, { name, icon }, { new: true });
        io.emit('categoryUpdated', updatedCategory);
        res.json(updatedCategory);
    } catch (err) {
        res.status(500).json({ error: "Error updating category" });
    }
};

// API to Delete a Category (User-Created Only)
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.findById(id);

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        if (category.isSystemDefault) {
            return res.status(403).json({ error: "Cannot delete system categories" });
        }

        await categoryModel.findByIdAndDelete(id);
        io.emit('categoryDeleted', id);
        res.json({ message: "Category deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting category" });
    }
};

// Export Controller Functions
module.exports = { seedCategories, getIcons, getCategories, createCategory,readCagetoryByID, updateCategory, deleteCategory };
