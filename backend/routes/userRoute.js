import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import authenticateUser from '../middleware/authMiddleware.js';

const router = express.Router();

// User Registration Route
router.post('/register', authenticateUser, registerUser);

// User Login Route
router.post('/login', authenticateUser, loginUser);

export default router;
