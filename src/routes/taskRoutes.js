import express from 'express';

const router = express.Router();

// Dummy Task Data
const tasks = [
    { id: 1, title: "Complete Backend API", status: "In Progress" },
    { id: 2, title: "Fix UI Bugs", status: "Pending" },
];

// GET all tasks
router.get('/', (req, res) => {
    res.json(tasks);
});

export default router;
