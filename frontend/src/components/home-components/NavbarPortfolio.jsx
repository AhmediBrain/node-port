import React, { useState } from 'react'
import logo from '../../images/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom'

const NavbarPortfolio = () => {
    const [click, setClick] = useState(false);

    const handleClick = () => {
        setClick(!click);
    }

    const closeMobileMenu = () => {
        setClick(false);
    }

    return (
        
        <div className='portfolio_navbar'>
            <div style={{ width: '100px'}}>
                <Link to='/'>
                    <img 
                        src={logo} 
                        alt='logo' 
                        className='portfolio_logo' />
                </Link>
            </div>
            <div className='portfolio_icon' 
                onClick={handleClick}>
                {click ? <CloseIcon /> : <MenuIcon />}
            </div>
            <div>
                <ul 
                    className={click ? 'portfolio_nav_menu active' : 'portfolio_nav_menu'}>
                    <li>
                        <Link to='/about' 
                            className='portfolio_nav_links' 
                            onClick={closeMobileMenu}>
                            About Me
                        </Link>
                    </li>
                    <li>My Projects</li>
                    <li>Contact Me</li>
                </ul>
            </div>
        </div>
    )
}

export default NavbarPortfolio