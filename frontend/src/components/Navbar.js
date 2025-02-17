import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <nav className={`${styles.navbar} ${darkMode ? styles.dark : ""}`}>
            {/* Logo */}
            <Link to="/" className={styles.logo}>
                Do It Now
            </Link>

            {/* Desktop Navigation */}
            <ul className={`${styles.navLinks} ${isOpen ? styles.show : ""}`}>
                <motion.li whileHover={{ scale: 2.1 }}><Link to="/" >Task</Link></motion.li>
                <motion.li whileHover={{ scale: 1.1 }}><Link to="/category">Category</Link></motion.li>
                <motion.li whileHover={{ scale: 1.1 }}><Link to="/profile">Profile</Link></motion.li>
            </ul>

            {/* Dark Mode Toggle */}
            <button onClick={toggleDarkMode} className={styles.darkModeToggle}>
                {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* Mobile Menu Icon */}
            <button onClick={toggleMenu} className={styles.menuIcon}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>
        </nav>
    );
};

export default Navbar;