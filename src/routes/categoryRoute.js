import express from 'express';
const { getIcons, getCategories, createCategory, readCategoryByID, updateCategory, deleteCategory } = require('../controllers/categoryController');

const router = express.Router();

// Icons API
router.get('/icons', getIcons); // Fetch all available icons
router.get('/', getCategories); // Fetch all categories (system + user-defined)

// Calls the controller functions -- Category CRUD
router.post('/', createCategory); // Create a new category
router.get('/:id', readCategoryByID); // Read a category by ID
router.put('/:id', updateCategory); // Update a category (only user-created ones)
router.delete('/:id', deleteCategory); // Delete a category (only user-created ones)

export default router;

