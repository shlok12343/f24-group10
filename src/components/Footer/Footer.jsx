import React from 'react';
import styles from './Footer.module.css'; // Ensure you have a corresponding CSS module file

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.about}>
                    <h4>About</h4>
                    <p>Welcome to WebsiteName the innovative app that transforms your kitchen ingredients into delicious recipes! Just tell us what you have on hand, and our app does the rest, instantly providing you with a variety of recipes you can cook without needing to run to the store. Whether you're a seasoned chef or a beginner, helping you save money and reduce food waste. Also feel free to explore random recipes.</p>
                </div>
                <div className={styles.contact}>
                    <h4>Contact Us</h4>
                    <p>Email: nanani@gmail.com</p>
                    <p>Phone: (857)7638527</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
