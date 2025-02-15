import cron from 'node-cron';
import { io } from '../server.js';
import taskModel from '../models/Task.js';
import subtaskModel from '../models/Subtask.js';

const scheduledJobs = new Map();

export const scheduleNotification = async (id, type, deadline, notificationTimes) => {
    // Clear any previously scheduled jobs for this task/subtask
    if (scheduledJobs.has(id)) {
        scheduledJobs.get(id).forEach(job => job.stop());
        scheduledJobs.delete(id);
    }

    const jobs = [];
    const now = new Date();

    notificationTimes.forEach(timeBefore => {
        const notificationTime = new Date(deadline.getTime() - timeBefore * 60000);
        
        if (notificationTime > now) {
            const job = cron.schedule(notificationTime, async () => {
                const item = type === 'task' ? await taskModel.findById(id) : await subtaskModel.findById(id);
                if (item) {
                    io.emit('notification', {
                        id,
                        title: item.title,
                        message: `Reminder: "${item.title}" is due soon!`,
                        deadline: item.deadline,
                        type
                    });
                }
            });
            jobs.push(job);
        }
    });

    scheduledJobs.set(id, jobs);
};
