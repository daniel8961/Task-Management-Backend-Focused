// Task List / Main Dashboard

import React, { useContext } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TaskView from './Task/TaskView';
import styles from '../styles/Dashboard.module.css';
import { ThemeContext } from '../context/ThemeContext';
import CategoryView from './Category/CategoryView';
import Profile from './User/Profile';

const Dashboard = () => {
    const { darkMode } = useContext(ThemeContext);

    return (
        <div className={`${styles.dashboard} ${darkMode ? styles.dark : ""}`}>
            <Header />
            <div className={styles.content}>
                <Navbar />
                <Sidebar />
            </div>
        </div>
    );
};

export default Dashboard;