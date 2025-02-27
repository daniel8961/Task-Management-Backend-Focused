import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import styles from '../styles/Header.module.css';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';

const Header = () => {
    const { darkMode, setDarkMode } = useContext(ThemeContext);

    return (
        <div className={`${styles.header} ${darkMode ? styles.dark : ""}`}>
            <Link to="/" className={styles.logo}>Do It Now</Link>
            {/* <button onClick={() => setDarkMode(!darkMode)} className={styles.toggleTheme}>
                {darkMode ? <FaSun /> : <FaMoon />}
            </button> */}
        </div>
    );
};

export default Header;