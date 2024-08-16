import React, { useContext, useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import figma from '../../images/figma.png'
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const DashboardNavbar = () => {
    const { user, logout } = useContext(UserContext);
    const [search, setSearch] = useState('');
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log('Search Submitted:', search);
    }

    const avatarDetails = () => {
        setShow(!show);
        console.log('Click');
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    }
    
    return (
        <div className='navbar'>
            <div className='navbar_wrapper'>
                <div className='dashboard_search'>
                    <input 
                        type='text'
                        placeholder='Search' 
                        value={search} 
                        onChange={handleSearchChange} />
                    <SearchOutlinedIcon 
                        sx={{ cursor: 'pointer' }} 
                        onClick={handleSearchSubmit} />
                </div>
                <div className='navbar_items'>
                    <div className='item'>
                        <p>Welcome, {user}</p>
                    </div>
                    <div className='item'>
                        <img src={figma} 
                            alt='avatar' 
                            className='avatar' 
                            onClick={avatarDetails} />
                        {show && 
                            (
                                <div className='avatar_dropdown'>
                                    <a href='/profile'>Profile</a>
                                    <button onClick={handleLogout}>Sign out</button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardNavbar