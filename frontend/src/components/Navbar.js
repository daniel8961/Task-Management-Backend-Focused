import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
    const { darkMode } = useContext(ThemeContext);

    return (
        <div className={styles.container}>
            <div className={styles.section}></div>
            <nav className={`${styles.navbar} ${darkMode ? styles.dark : ""}`}>
                <Link to="/category" className={styles.navbarButton}>Categories</Link>
                <Link to="/task" className={styles.navbarButton}>Tasks</Link>
                <Link to="/profile" className={styles.navbarButton}>Profile</Link>
            </nav>
        </div>
    );
};

export default Navbar;