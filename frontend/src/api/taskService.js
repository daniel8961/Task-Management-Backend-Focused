export const updateTaskAPI = async (task) => {
    try {
        const response = await fetch(`/api/tasks/${task.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        return await response.json();
    } catch (error) {
        console.error("Error updating task:", error);
    }
};

export const deleteTaskAPI = async (taskId) => {
    try {
        await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
    } catch (error) {
        console.error("Error deleting task:", error);
    }
};
