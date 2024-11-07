import React from 'react';
import styles from './Footer.module.css'; // Ensure you have a corresponding CSS module file

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.about}>
                    <h4>About</h4>
                    <p>Learn more about our mission and services.</p>
                </div>
                <div className={styles.contact}>
                    <h4>Contact Us</h4>
                    <p>Email: nanani.s@northeastern.edu</p>
                    <p>Phone: 000000000</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
