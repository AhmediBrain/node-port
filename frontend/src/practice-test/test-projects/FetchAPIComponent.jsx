import React, { useEffect, useState } from 'react';
import { apiTitle } from '../practiceData';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

const FetchAPIComponent = () => {
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

    const handleUserChange = (e) => {
        setEditUser(e.target.value);
    }

    const handleDeleteRow = (id) => {
        const updatedUser = users.filter((user) => user.id !== id);
        setUsers(updatedUser);
        setFilteredUser(filteredUser.filter((user) => user.id !== id));
    }

    const handleSaveUser = (id) => {
        const savedValue = users.map(
            (user) => 
                user.id === id ? { ...user, username: editUser } : user
        );

        setUsers(savedValue);
        setEditID(null);
    }

    const handleEditUser = (id, currentUser) => {
        setEditID(id);
        setEditUser(currentUser);
    }

    return (
        <div>
            <h4 style={{ color: '#004880' }}>User's Infomation</h4>
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '0 10px 10px 0', gap: '1%' }}>
                <input 
                    type='text' 
                    value={searchText} 
                    onChange={handleSearchChange} 
                    style={{ border: '1px solid #4c8cbd', outline: 'none', padding: '5px 8px' }} />
                <button 
                    onClick={handleReset} 
                    style={{ border: '2px solid #DB8500', color: '#DB8500', fontWeight: 'bold', borderRadius: '5px', cursor: 'pointer' }}>
                    Reset
                </button>
            </div>
            <div style={{ display: 'flex', overflowX: 'auto' }}>
                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            {apiTitle.map((user) => {
                                return (
                                    <th key={user.id} 
                                        style={{ padding: '5px', color: '#004880' }}>
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
                                    <td style={{ fontSize: '14px', color: '#004880' }}>{user.name}</td>
                                    <td style={{ fontSize: '14px', color: '#004880' }}>
                                        {editID === user.id ? (
                                            <input 
                                                type='text' 
                                                value={editUser} 
                                                onChange={handleUserChange} 
                                                style={{ border: '1px solid #4c8cbd', outline: 'none', padding: '5px 8px', margin: '0 10px' }} />
                                        ) : (
                                            <span>{user.username}</span>
                                        )}
                                    </td>
                                    <td style={{ fontSize: '14px', color: '#004880' }}>{user.email}</td>
                                    <td style={{ fontSize: '14px', color: '#004880' }}>{user.website}</td>
                                    <td>
                                        <span style={{ fontSize: '10px' }}><span style={{ fontWeight: 'bold', color: '#004880' }}>Street: </span>{street}</span>
                                        <br />
                                        <span style={{ fontSize: '10px' }}><span style={{ fontWeight: 'bold', color: '#004880' }}>Suite: </span>{suite}</span>
                                        <br />
                                        <span style={{ fontSize: '10px' }}><span style={{ fontWeight: 'bold', color: '#004880' }}>City: </span>{city}</span>
                                        <br />
                                        <span style={{ fontSize: '10px' }}><span style={{ fontWeight: 'bold', color: '#004880' }}>Zip Code: </span>{zipcode}</span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                            <button 
                                                style={{ border: 'none', padding: '0px', cursor: 'pointer', background: 'transparent' }} 
                                                onClick={() => handleDeleteRow(user.id)}>
                                                <HighlightOffIcon 
                                                    titleAccess='Delete' 
                                                    sx={{ color: '#C42B1C' }} />
                                            </button>
                                            {editID === user.id ? (
                                                <button 
                                                    style={{ border: 'none', padding: '0px', cursor: 'pointer', background: 'transparent' }} 
                                                    onClick={() => handleSaveUser(user.id)}>
                                                    <SaveOutlinedIcon 
                                                        titleAccess='Save' 
                                                        sx={{ color: '#279847' }} />
                                                </button>
                                            ) : (
                                                <button 
                                                    style={{ border: 'none', padding: '0px', cursor: 'pointer', background: 'transparent' }} 
                                                    onClick={() => handleEditUser(user.id, user.username)}>
                                                    <EditNoteOutlinedIcon 
                                                        titleAccess='Edit' 
                                                        sx={{ color: '#0078B9', fontSize: '30px' }} />
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

export default FetchAPIComponent