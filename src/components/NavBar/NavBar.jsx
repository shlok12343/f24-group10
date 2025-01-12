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
            <a href="#">Recipe Warehouse</a>
          </div>
          <ul className={`${styles.links} ${isOpen ? styles.showMenu : ''}`}>
            <li>
              <a href="#search" onClick={() => setIsOpen(false)}>
                Search
              </a>
            </li>
            <li>
              <a href="#explore" onClick={() => setIsOpen(false)}>
                Explore
              </a>
            </li>
            <li>
              <a href="#contribute" onClick={() => setIsOpen(false)}>
                Contribute
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default NavBar;
