import React, { useState } from 'react';
import { usersTitle } from '../practiceData';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

const UsersInformationComponent = () => {
    const [addNew, setAddNew] = useState(
        {
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            address: {
                street: '',
                suite: '',
                city: '',
                zipcode: ''
            }
        }
    );

    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [editID, setEditID] = useState(null);
    const [userText, setUserText] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleInfoChange = (e) => {
        const { name, value } = e.target;

        if(name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setAddNew((prevValue) => ({
                ...prevValue,
                address: {
                    ...prevValue.address,
                    [addressField]: value
                }
            }));
        } 
        else {
            setAddNew((prevValue) => ({
                ...prevValue,
                [name]: value
            }));
        }
    }

    const handleAddUser = () => {
        if(!addNew.firstname || !addNew.lastname || !addNew.username || !addNew.email) {
            alert('Please fill all the required fields.');
            return;
        } 
        else {
            const userID = Date.now();
            setUsers([
                ...users,
                { ...addNew, id: userID }
            ]);

            setAddNew(
                {
                    firstname: '',
                    lastname: '',
                    username: '',
                    email: '',
                    address: {
                        street: '',
                        suite: '',
                        city: '',
                        zipcode: ''
                    }
                }
            );
        }
    }

    console.log('New User:', addNew);

    const handleSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchText(searchValue);

        const filteredValue = users.filter(
            (user) => 
                user.firstname.toLowerCase().includes(searchValue) || 
                user.lastname.toLowerCase().includes(searchValue) || 
                user.username.toLowerCase().includes(searchValue)
        );

        setFilteredUsers(filteredValue);
    }

    const handleReset = () => {
        setSearchText('');
        setFilteredUsers(users);
    }

    const handleDeleteRow = (id) => {
        const updatedUser = users.filter((user) => user.id !== id);
        setUsers(updatedUser);
    }

    const handleUserTextChange = (e) => {
        setUserText(e.target.value);
    }

    const handleSaveUser = (id) => {
        const savedValue = users.map(
            (user) => 
                user.id === id ? { ...user, username: userText } : user
        );

        setUsers(savedValue);
        setEditID(null);
    }

    const handleEditUser = (id, currentUser) => {
        setEditID(id);
        setUserText(currentUser);
    }

    return (
        <div style={{ marginBottom: '16px' }}>
            <h5 style={{ color: '#056b9b' }}>Add New User</h5>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: '10px' }}>
                <fieldset style={{ border: 'none', textAlign: 'left', marginBottom: '10px' }}>
                    <legend style={{ color: '#056b9b', fontSize: '13px' }}>
                        <span style={{ color: '#FF0303' }}>*</span>First Name
                    </legend>
                    <input 
                        type='text' 
                        name='firstname' 
                        value={addNew.firstname} 
                        onChange={handleInfoChange}
                        style={{ border: '1px solid #88bcd4', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ border: 'none', textAlign: 'left', marginBottom: '10px' }}>
                    <legend style={{ color: '#056b9b', fontSize: '13px' }}>
                        <span style={{ color: '#FF0303' }}>*</span>Last Name
                    </legend>
                    <input 
                        type='text' 
                        name='lastname' 
                        value={addNew.lastname} 
                        onChange={handleInfoChange}
                        style={{ border: '1px solid #88bcd4', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ border: 'none', textAlign: 'left', marginBottom: '10px' }}>
                    <legend style={{ color: '#056b9b', fontSize: '13px' }}>
                        <span style={{ color: '#FF0303' }}>*</span>User Name
                    </legend>
                    <input 
                        type='text' 
                        name='username' 
                        value={addNew.username} 
                        onChange={handleInfoChange}
                        style={{ border: '1px solid #88bcd4', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ border: 'none', textAlign: 'left', marginBottom: '10px' }}>
                    <legend style={{ color: '#056b9b', fontSize: '13px' }}>
                        <span style={{ color: '#FF0303' }}>*</span>Email
                    </legend>
                    <input 
                        type='email' 
                        name='email' 
                        value={addNew.email} 
                        onChange={handleInfoChange}
                        style={{ border: '1px solid #88bcd4', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ border: 'none', textAlign: 'left', marginBottom: '10px' }}>
                    <legend style={{ color: '#056b9b', fontSize: '13px' }}>Street</legend>
                    <input 
                        type='text' 
                        name='address.street' 
                        value={addNew.address.street} 
                        onChange={handleInfoChange}
                        style={{ border: '1px solid #88bcd4', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ border: 'none', textAlign: 'left', marginBottom: '10px' }}>
                    <legend style={{ color: '#056b9b', fontSize: '13px' }}>Suite</legend>
                    <input 
                        type='text' 
                        name='address.suite' 
                        value={addNew.address.suite} 
                        onChange={handleInfoChange}
                        style={{ border: '1px solid #88bcd4', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ border: 'none', textAlign: 'left', marginBottom: '10px' }}>
                    <legend style={{ color: '#056b9b', fontSize: '13px' }}>City</legend>
                    <input 
                        type='text' 
                        name='address.city' 
                        value={addNew.address.city} 
                        onChange={handleInfoChange}
                        style={{ border: '1px solid #88bcd4', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ border: 'none', textAlign: 'left', marginBottom: '10px' }}>
                    <legend style={{ color: '#056b9b', fontSize: '13px' }}>Zip Code</legend>
                    <input 
                        type='text' 
                        name='address.zipcode' 
                        value={addNew.address.zipcode} 
                        onChange={handleInfoChange}
                        style={{ border: '1px solid #88bcd4', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <div>
                    <button 
                        style={{ backgroundColor: '#27A243', color: '#FFFFFF', border: '1px solid #02811f', fontWeight: 'bold', borderRadius: '4px', padding: '5px 8px', cursor: 'pointer' }} 
                        onClick={handleAddUser}>
                        Add User
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowX: 'auto', marginTop: '16px' }}>
                <div>
                    <h4 style={{ color: '#056b9b' }}>User's Information</h4>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1%', margin: '0 10px 10px 0' }}>
                    <input 
                        type='text' 
                        placeholder='Search ...'
                        value={searchText} 
                        onChange={handleSearchChange} 
                        style={{ border: '1px solid #88bcd4', outline: 'none', padding: '5px 8px' }} />
                    <button 
                        style={{ border: '1px solid #FF0303', color: '#FF0303', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }} 
                        onClick={handleReset}>
                        Reset
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            {usersTitle.map((user) => {
                                return (
                                    <th key={user.id} 
                                        style={{ padding: '5px', color: '#056b9b' }}>
                                        {user.title}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {(searchText ? filteredUsers : users).map((user) => {
                            const { street, suite, city, zipcode } = user.address;

                            return (
                                <tr key={user.id}>
                                    <td style={{ fontSize: '14px', color: '#043e58' }}>{user.firstname}</td>
                                    <td style={{ fontSize: '14px', color: '#043e58' }}>{user.lastname}</td>
                                    <td style={{ fontSize: '14px', color: '#043e58' }}>
                                        {editID === user.id ? (
                                            <input 
                                                type='text' 
                                                value={userText} 
                                                onChange={handleUserTextChange} 
                                                style={{ border: '1px solid #88bcd4', outline: 'none', padding: '5px 8px' }} />
                                        ) : (
                                            <span>{user.username}</span>
                                        )}
                                    </td>
                                    <td style={{ fontSize: '14px', color: '#043e58' }}>{user.email}</td>
                                    <td>
                                        <span style={{ fontSize: '10px', color: '#043e58' }}><span style={{ fontWeight: 'bold' }}>Street: </span>{street}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: '#043e58' }}><span style={{ fontWeight: 'bold' }}>Suite: </span>{suite}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: '#043e58' }}><span style={{ fontWeight: 'bold' }}>City: </span>{city}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: '#043e58' }}><span style={{ fontWeight: 'bold' }}>Zip Code: </span>{zipcode}</span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                            <button style={{ border: 'none', padding: '0px', cursor: 'pointer' }} 
                                                onClick={() => handleDeleteRow(user.id)}>
                                                <HighlightOffIcon 
                                                    sx={{ color: '#FF0303'  }}
                                                    titleAccess='Delete' />                                                
                                            </button>
                                            {editID === user.id ? (
                                                <button style={{ border: 'none', padding: '0px', cursor: 'pointer' }} 
                                                    onClick={() => handleSaveUser(user.id)}>
                                                    <SaveOutlinedIcon 
                                                        sx={{ color: '#27A243' }} 
                                                        titleAccess='Save' />
                                                </button>
                                            ) : (
                                                <button style={{ border: 'none', padding: '0px', cursor: 'pointer' }} 
                                                    onClick={() => handleEditUser(user.id, user.username)}>
                                                    <EditNoteOutlinedIcon 
                                                        sx={{ color: '#056b9b', fontSize: '30px' }} 
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

export default UsersInformationComponent