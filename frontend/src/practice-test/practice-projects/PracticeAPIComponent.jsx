import React, { useEffect, useState } from 'react'
import { apiTitle } from '../practiceData';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';

const PracticeAPIComponent = () => {
    const [searchText, setSearchText] = useState('');
    const [users, setUsers] = useState([]);
    const [editID, setEditID] = useState(null);
    const [editUser, setEditUser] = useState('');
    const [filteredUser, setFilteredUser] = useState([]);

    const apiUrl = 'https://jsonplaceholder.typicode.com/users';

    useEffect(() => {
        fetch(apiUrl)
        .then((response) => response.json())
        .then((result) => {
            setUsers(result);
            setFilteredUser(result);
            console.log('Result:', result);
        });
    }, []);

    const handleSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchText(searchValue);

        const filteredValue = filteredUser.filter(
            (user) => 
                user.name.toLowerCase().includes(searchValue) || 
                user.username.toLowerCase().includes(searchValue) || 
                user.email.toLowerCase().includes(searchValue)
        );

        setUsers(filteredValue);
    }

    const handleReset = () => {
        setSearchText('');
        setUsers(filteredUser);
    }

    const handleDeleteUser = (id) => {
        const updatedUser = users.filter((user) => user.id !== id);
        setUsers(updatedUser);

        setFilteredUser(filteredUser.filter((user) => user.id !== id));
    }

    const handleSaveUser = (id) => {
        const userValue = users.map(
            (user) => 
                user.id === id ? { ...user, username: editUser } : user
        );

        setUsers(userValue);
        setEditID(null);
    }

    const handleEditUser = (id, currentUser) => {
        setEditID(id);
        setEditUser(currentUser);
    }

    return (
        <div style={{ backgroundColor: '#f1ecf3', padding: '2px' }}>
            <h4 style={{ color: '#9763A6' }}>User's Information</h4>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '2%', margin: '0 10px 10px 0' }}>
                <input 
                    type='text' 
                    value={searchText} 
                    onChange={handleSearchChange} 
                    placeholder='Search ...'
                    style={{ border: '1px solid #e6bdf1', outline: 'none', padding: '5px 8px' }} />
                <button 
                    style={{ border: '2px solid #E08800', borderRadius: '5px', color: '#E08800', fontWeight: 'bold', cursor: 'pointer' }} 
                    onClick={handleReset}>
                    Reset
                </button>
            </div>
            <div style={{ overflowX: 'auto', marginBottom: '10px' }}>
                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            {apiTitle.map((user) => {
                                return (
                                    <th key={user.id} 
                                        style={{ padding: '8px', color: '#9763A6' }}>
                                        {user.title}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => {
                            const { street, suite, city, zipcode } = user.address;

                            return (
                                <tr key={user.id}>
                                    <td style={{ fontSize: '14px', color: '#7b6b80' }}>{user.name}</td>
                                    <td style={{ fontSize: '14px', color: '#7b6b80' }}>
                                        {editID === user.id ? (
                                            <input 
                                                type='text' 
                                                value={editUser} 
                                                onChange={(e) => setEditUser(e.target.value)} 
                                                style={{ border: '1px solid #e6bdf1', outline: 'none', padding: '5px 8px', color: '#0591dd' }} />
                                        ) : (
                                            <span>{user.username}</span>
                                        )}
                                    </td>
                                    <td style={{ fontSize: '14px', color: '#7b6b80' }}>{user.email}</td>
                                    <td style={{ fontSize: '14px', color: '#7b6b80' }}>{user.website}</td>
                                    <td>
                                        <span style={{ fontSize: '10px', color: '#7b6b80' }}><span style={{ fontWeight: 'bold' }}>Street: </span>{street}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: '#7b6b80' }}><span style={{ fontWeight: 'bold' }}>Suite: </span>{suite}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: '#7b6b80' }}><span style={{ fontWeight: 'bold' }}>City: </span>{city}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: '#7b6b80' }}><span style={{ fontWeight: 'bold' }}>Zip Code: </span>{zipcode}</span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'space-evenly', gap: '2%' }}>
                                            <button 
                                                style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                                onClick={() => handleDeleteUser(user.id)}>
                                                <HighlightOffOutlinedIcon 
                                                    sx={{ color: '#C42B1C' }} 
                                                    titleAccess='Delete' />
                                            </button>
                                            {editID === user.id ? (
                                                <button 
                                                    style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                                    onClick={() => handleSaveUser(user.id)}>
                                                    <SaveOutlinedIcon 
                                                        sx={{ color: '#408F47' }} 
                                                        titleAccess='Save' />
                                                </button>
                                            ) : (
                                                <button 
                                                    style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                                    onClick={() => handleEditUser(user.id, user.username)}>
                                                    <AppRegistrationOutlinedIcon 
                                                        sx={{ color: '#007ABB' }} 
                                                        titleAccess='Edit' />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PracticeAPIComponent