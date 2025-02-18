import { useState, useEffect, useContext } from "react";
import styles from "../styles/Navbar.module.css";
import TaskView from "../pages/Task/TaskView";
import CategoryView from "../pages/Category/CategoryView";
import Profile from "../pages/User/Profile";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
    const [activeTab, setActiveTab] = useState("task");
    const { darkMode } = useContext(ThemeContext);

    return (
        <div>
            <nav className={`${styles.navbar} ${darkMode ? styles.dark : ""}`}>
                <button onClick={() => setActiveTab("category")} className={styles.navbarButton}>Categories</button>
                <button onClick={() => setActiveTab("task")} className={styles.navbarButton}>Tasks</button>
                <button onClick={() => setActiveTab("profile")} className={styles.navbarButton}>Profile</button>
            </nav>
            <div className={styles.content}>
                {activeTab === "category" && <CategoryView />}
                {activeTab === "task" && <TaskView />}
                {activeTab === "profile" && <Profile />}
            </div>

        </div>
    );
};

export default Navbar;