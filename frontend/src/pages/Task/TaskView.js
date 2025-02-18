import { useState, useEffect } from "react";
import { useSidebar } from "../../context/SidebarContext";
import { updateTaskAPI, deleteTaskAPI } from "../../api/taskService"; // Import API functions
import styles from "../../styles/Task.module.css";

const Task = () => {
    const { openSidebar } = useSidebar(); // Sidebar control
    const [tasks, setTasks] = useState([]);

    // Fetch tasks from server
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch("/api/tasks");
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Update task immediately on change
    const handleTaskChange = async (index, value) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].title = value;
        setTasks(updatedTasks);

        // Update the server
        await updateTaskAPI(updatedTasks[index]);
    };

    // Update subtask immediately on change
    const handleSubtaskChange = async (taskIndex, subIndex, value) => {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex].subtasks[subIndex].title = value;
        setTasks(updatedTasks);

        // Update the server
        await updateTaskAPI(updatedTasks[taskIndex]);
    };

    // Add new task and save it
    const addNewTask = async () => {
        const newTask = { id: Date.now(), title: "", subtasks: [], category: "General" };
        setTasks([...tasks, newTask]);

        // Save to server
        await updateTaskAPI(newTask);
    };

    // Add new subtask and save it
    const addNewSubtask = async (taskIndex) => {
        const updatedTasks = [...tasks];
        const newSubtask = { id: Date.now(), title: "", category: "General" };
        updatedTasks[taskIndex].subtasks.push(newSubtask);
        setTasks(updatedTasks);

        // Save to server
        await updateTaskAPI(updatedTasks[taskIndex]);
    };

    // Delete task
    const deleteTask = async (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));

        // Delete from server
        await deleteTaskAPI(taskId);
    };

    // Delete subtask
    const deleteSubtask = async (taskIndex, subIndex) => {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex].subtasks.splice(subIndex, 1);
        setTasks(updatedTasks);

        // Update server
        await updateTaskAPI(updatedTasks[taskIndex]);
    };

    return (
        <div className={styles.taskContainer}>
            <h2>Tasks</h2>
            <ul>
                {tasks.map((task, taskIndex) => (
                    <li key={task.id} className={styles.taskItem}>
                        {/* Task Input */}
                        <span className={styles.bullet}>•</span>
                        <input
                            type="text"
                            placeholder="Enter your task"
                            value={task.title}
                            onChange={(e) => handleTaskChange(taskIndex, e.target.value)}
                            onClick={() => openSidebar("task", task)}
                        />
                        {/* Category Label */}
                        <span className={styles.categoryLabel}>{task.category}</span>
                        {/* Delete Button */}
                        <button className={styles.deleteButton} onClick={() => deleteTask(task.id)}>✖</button>

                        {/* Subtasks */}
                        <ul className={styles.subtaskList}>
                            {task.subtasks.map((subtask, subIndex) => (
                                <li key={subIndex} className={styles.subtaskItem}>
                                    <span className={styles.subBullet}>◦</span>
                                    <input
                                        type="text"
                                        placeholder="Enter your subtask"
                                        value={subtask.title}
                                        onChange={(e) => handleSubtaskChange(taskIndex, subIndex, e.target.value)}
                                    />
                                    {/* Category Label */}
                                    <span className={styles.categoryLabel}>{subtask.category}</span>
                                    {/* Delete Button */}
                                    <button className={styles.deleteButton} onClick={() => deleteSubtask(taskIndex, subIndex)}>✖</button>
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => addNewSubtask(taskIndex)}>+ Add Subtask</button>
                    </li>
                ))}
            </ul>
            <button onClick={addNewTask} className={styles.addTaskButton}>+ Add Task</button>
        </div>
    );
};

export default Task;
