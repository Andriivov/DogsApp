import { NavLink } from "react-router-dom";

import styles from './Header.module.scss';

const Header = () => {
    const getActiveLink = ({ isActive }) => isActive ? styles.active : styles.header__navigationLink;
    

    return (
        <header className={styles.header}>
            <NavLink to='/' className={getActiveLink}>Home</NavLink>
            <NavLink to='/saved' className={getActiveLink}>Saved</NavLink>
        </header>
    );
};

export default Header;