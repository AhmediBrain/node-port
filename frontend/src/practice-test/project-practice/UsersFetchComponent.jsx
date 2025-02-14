import React, { useEffect, useState } from 'react'
import { apiTitle } from '../practiceData';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

const UsersFetchComponent = () => {
    const [searchText, setSearchText] = useState('');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [editID, setEditID] = useState(null);
    const [editUser, setEditUser] = useState('');

    const serverUrl = 'https://jsonplaceholder.typicode.com/users';

    useEffect(() => {
        fetch(serverUrl)
        .then((response) => response.json())
        .then((result) => {
            setUsers(result);
            setFilteredUsers(result);
            console.log('Result:', result);
        });
    }, []);

    const handleSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchText(searchValue);

        const filteredValue = filteredUsers.filter(
            (user) => 
                user.name.toLowerCase().includes(searchValue) || 
                user.username.toLowerCase().includes(searchValue) || 
                user.email.toLowerCase().includes(searchValue)
        );

        setUsers(filteredValue);
    }

    const handleReset = () => {
        setSearchText('');
        setUsers(filteredUsers);
    }

    const handleDeleteRow = (id) => {
        const updatedRow = users.filter((user) => user.id !== id);
        setUsers(updatedRow);
        setFilteredUsers(filteredUsers.filter((user) => user.id !== id));
    }

    const handleEditUser = (id, currentUser) => {
        setEditID(id);
        setEditUser(currentUser);
    }

    const handleUserChange = (e) => {
        setEditUser(e.target.value);
    }

    const handleSaveUser = (id) => {
        const savedValue = users.map(
            (user) => 
                user.id === id ? { ...user, username: editUser } : user
        );

        setUsers(savedValue);
        setEditID(null);
    }

    return (
        <div style={{ marginBottom: '16px' }}>
            <h5 style={{ color: '#1FACC1' }}>User's Information</h5>
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '0 10px 10px 0', gap: '1%' }}>
                <input 
                    style={{ border: '1px solid #2bd8f3', outline: 'none', padding: '5px 8px' }} 
                    type='text' 
                    value={searchText} 
                    onChange={handleSearchChange} />
                <button 
                    style={{ border: '1px solid #C42B1C', borderRadius: '4px', color: '#C42B1C', fontWeight: 'bold', background: 'transparent', cursor: 'pointer' }} 
                    onClick={handleReset}>
                    Reset
                </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            {apiTitle.map((user) => {
                                return (
                                    <th key={user.id} 
                                        style={{ color: '#1FACC1', padding: '5px' }}>
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
                                    <td>{user.name}</td>
                                    <td>
                                        {editID === user.id ? (
                                            <input 
                                                type='text' 
                                                value={editUser} 
                                                onChange={handleUserChange} 
                                                style={{ border: '1px solid #2bd8f3', outline: 'none', padding: '5px 8px' }} />
                                        ) : (
                                            <span>{user.username}</span>
                                        )}
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.website}</td>
                                    <td>
                                        <span style={{ fontSize: '10px' }}><span style={{ fontWeight: 'bold' }}>Street: </span>{street}</span>
                                        <br />
                                        <span style={{ fontSize: '10px' }}><span style={{ fontWeight: 'bold' }}>Suite: </span>{suite}</span>
                                        <br />
                                        <span style={{ fontSize: '10px' }}><span style={{ fontWeight: 'bold' }}>City: </span>{city}</span>
                                        <br />
                                        <span style={{ fontSize: '10px' }}><span style={{ fontWeight: 'bold' }}>Zip Code: </span>{zipcode}</span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                            <button 
                                                style={{ border: 'none', padding: '0px', background: 'transparent', cursor: 'pointer' }} 
                                                onClick={() => handleDeleteRow(user.id)}>
                                                <HighlightOffIcon 
                                                    style={{ color: '#C42B1C' }}
                                                    titleAccess='Delete' />
                                            </button>
                                            {editID === user.id ? (
                                                <button 
                                                    style={{ border: 'none', padding: '0px', background: 'transparent', cursor: 'pointer' }} 
                                                    onClick={() => handleSaveUser(user.id)}>
                                                    <SaveOutlinedIcon 
                                                        style={{ color: '#1BA900' }}
                                                        titleAccess='Save' />
                                                </button>
                                            ) : (
                                                <button 
                                                    style={{ border: 'none', padding: '0px', background: 'transparent', cursor: 'pointer' }} 
                                                    onClick={() => handleEditUser(user.id, user.username)}>
                                                    <EditNoteOutlinedIcon 
                                                        style={{ color: '#057cb3', fontSize: '30px' }} 
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

export default UsersFetchComponent