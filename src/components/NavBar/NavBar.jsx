import styles from './NavBar.module.css';
import { useState } from 'react';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <div className={styles.menuIcon} onClick={toggleMenu}>
            ☰
          </div>
          <div className={styles.websiteName}>
            <a href="#">WebsiteName</a>
          </div>
          <ul className={`${styles.links} ${isOpen ? styles.showMenu : ''}`}>
            <li>About</li>
            <li>Search</li>
            <li>Explore</li>
            <li>Contribute</li>
          </ul>
        </nav>
        <button className={styles.login}>Log In</button>
      </div>
    </>
  );
}

export default NavBar;
