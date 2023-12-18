import {useState} from 'react';
import './Navbar.component.scss'
import {Link} from 'react-router-dom';
import {Menu, LightMode, DarkMode} from '@mui/icons-material';
import {ToggleButton} from "@mui/material";
import {useContext} from "react";
import {ThemeContext} from "../../context/theme.context";

const links = [
    {href: "/", label: "Home"},
    {href: "/companies", label: "Companies"},
    {href: "/jobs", label: "Jobs"},
    {href: "/candidates", label: "Candidates"},
]
const NavbarComponent = () => {

    const {darkMode, toggleTheme} = useContext(ThemeContext)
    const [open, setOpen] = useState<boolean>(true)
    const toggleOpenMenu = (): void => {
        setOpen(prev => !prev);
    }

    const menuStyles = open ? 'menu open' : 'menu';

    return (
        <div className="navbar">
            <div className="brand">
                <span>Resume Management</span>
            </div>
            <div className={menuStyles}>
                <ul>
                    {links.map(item => (
                        <li key={item.href} onClick={toggleOpenMenu}>
                            <Link to={item.href}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="hamburger">
                <Menu onClick={toggleOpenMenu} />
            </div>
            <div className="toggle">
                <ToggleButton value={'change'} selected={darkMode} onChange={toggleTheme}>
                    {darkMode ? <LightMode /> : <DarkMode />}
                   </ToggleButton>
            </div>
        </div>
    );
};
export default NavbarComponent;