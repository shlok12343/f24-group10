import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <section id="footer" className={styles.container}>
      <p>
        &copy;2024 Oasis Group 10. <br />
        All rights reserved.
      </p>
    </section>
  );
}

export default Footer;
