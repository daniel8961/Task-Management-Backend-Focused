// Task List / Main Dashboard

import React, { useContext } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TaskView from './Task/TaskView';
import styles from '../styles/Dashboard.module.css';
import { ThemeContext } from '../context/ThemeContext';

const Dashboard = () => {
    const { darkMode } = useContext(ThemeContext);

    return (
        <div className={`${styles.dashboard} ${darkMode ? styles.dark : ""}`}>
            <Header />
            <Navbar />
            <div className={styles.content}>
                <TaskView />
                <Sidebar />
            </div>
        </div>
    );
};

export default Dashboard;