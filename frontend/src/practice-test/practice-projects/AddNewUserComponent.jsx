import React, { useState } from 'react';
import { usersTitle } from '../practiceData';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';

const AddNewUserComponent = () => {
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
    const [editUser, setEditUser] = useState('');
    const [filteredUser, setFilteredUser] = useState([]);

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

    const handleNewUser = () => {
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
        }

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

    const handleSearchText = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchText(searchValue);

        const filteredValue = users.filter(
            (user) => 
                user.firstname.toLowerCase().includes(searchValue) || 
                user.lastname.toLowerCase().includes(searchValue) || 
                user.username.toLowerCase().includes(searchValue)
        );

        setFilteredUser(filteredValue);
    }

    const handleReset = () => {
        setSearchText('');
        setFilteredUser(users);
    }

    const handleDeleteUser = (id) => {
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
            <h5 style={{ color: '#9763A6' }}>New User Component</h5>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <fieldset style={{ textAlign: 'left', border: 'none' }}>
                    <legend style={{ fontSize: '13px', color: '#9763A6' }}>First Name</legend>
                    <input 
                        type='text' 
                        name='firstname'
                        value={addNew.firstname} 
                        onChange={handleInfoChange} 
                        style={{ border: '1px solid #ceb0d6', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ textAlign: 'left', border: 'none' }}>
                    <legend style={{ fontSize: '13px', color: '#9763A6' }}>Last Name</legend>
                    <input 
                        type='text' 
                        name='lastname'
                        value={addNew.lastname} 
                        onChange={handleInfoChange} 
                        style={{ border: '1px solid #ceb0d6', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ textAlign: 'left', border: 'none' }}>
                    <legend style={{ fontSize: '13px', color: '#9763A6' }}>Username</legend>
                    <input 
                        type='text' 
                        name='username'
                        value={addNew.username} 
                        onChange={handleInfoChange} 
                        style={{ border: '1px solid #ceb0d6', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ textAlign: 'left', border: 'none' }}>
                    <legend style={{ fontSize: '13px', color: '#9763A6' }}>Email</legend>
                    <input 
                        type='email' 
                        name='email'
                        value={addNew.email} 
                        onChange={handleInfoChange} 
                        style={{ border: '1px solid #ceb0d6', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ textAlign: 'left', border: 'none' }}>
                    <legend style={{ fontSize: '13px', color: '#9763A6' }}>Street</legend>
                    <input 
                        type='text' 
                        name='address.street'
                        value={addNew.address.street} 
                        onChange={handleInfoChange} 
                        style={{ border: '1px solid #ceb0d6', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ textAlign: 'left', border: 'none' }}>
                    <legend style={{ fontSize: '13px', color: '#9763A6' }}>Suite</legend>
                    <input 
                        type='text' 
                        name='address.suite'
                        value={addNew.address.suite} 
                        onChange={handleInfoChange} 
                        style={{ border: '1px solid #ceb0d6', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ textAlign: 'left', border: 'none' }}>
                    <legend style={{ fontSize: '13px', color: '#9763A6' }}>City</legend>
                    <input 
                        type='text' 
                        name='address.city'
                        value={addNew.address.city} 
                        onChange={handleInfoChange} 
                        style={{ border: '1px solid #ceb0d6', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ textAlign: 'left', border: 'none' }}>
                    <legend style={{ fontSize: '13px', color: '#9763A6' }}>Zip Code</legend>
                    <input 
                        type='text' 
                        name='address.zipcode'
                        value={addNew.address.zipcode} 
                        onChange={handleInfoChange} 
                        style={{ border: '1px solid #ceb0d6', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
            </div>
            <div style={{ margin: '10px 0px' }}>
                <button 
                    style={{ border: '2px solid #9763A6', color: '#9763A6', fontWeight: 'bold', borderRadius: '5px', padding: '5px 8px', cursor: 'pointer' }} 
                    onClick={handleNewUser}>
                    Add User
                </button>
            </div>

            <div style={{ border: '1px solid #ceb0d6', padding: '10px', margin: '16px 0px' }}>
                <h5 style={{ margin: '0px', color: '#9763A6' }}>User's Information</h5>
                <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px', gap: '1%' }}>
                    <input 
                        type='text' 
                        value={searchText} 
                        onChange={handleSearchText}
                        style={{ border: '1px solid #ceb0d6', outline: 'none', padding: '5px 8px' }} />
                    <button 
                        style={{ border: '2px solid #E96725', color: '#E96725', fontWeight: 'bold', borderRadius: '5px', cursor: 'pointer' }} 
                        onClick={handleReset}>
                        Reset
                    </button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                {usersTitle.map((user) => {
                                    return (
                                        <th key={user.id} 
                                            style={{ padding: '5px' }}>
                                            {user.title}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>

                        <tbody>
                            {(searchText ? filteredUser : users).map((user) => {
                                const { street, suite, city, zipcode } = user.address;

                                return (
                                    <tr key={user.id}>
                                        <td style={{ fontSize: '14px', color: '#9763A6' }}>{user.firstname}</td>
                                        <td style={{ fontSize: '14px', color: '#9763A6' }}>{user.lastname}</td>
                                        <td style={{ fontSize: '14px', color: '#9763A6' }}>
                                            {editID === user.id ? (
                                                <input 
                                                    type='text' 
                                                    value={editUser} 
                                                    onChange={(e) => setEditUser(e.target.value)} 
                                                    style={{ border: '1px solid #ceb0d6', outline: 'none', padding: '5px 8px' }} />
                                            ) : (
                                                <>{user.username}</>
                                            )}
                                        </td>
                                        <td style={{ fontSize: '14px', color: '#9763A6' }}>{user.email}</td>
                                        <td>
                                            <span style={{ fontSize: '10px', color: '#9763A6' }}><span style={{ fontWeight: 'bold' }}>Street: </span>{street}</span>
                                            <br />
                                            <span style={{ fontSize: '10px', color: '#9763A6' }}><span style={{ fontWeight: 'bold' }}>Suite: </span>{suite}</span>
                                            <br />
                                            <span style={{ fontSize: '10px', color: '#9763A6' }}><span style={{ fontWeight: 'bold' }}>City: </span>{city}</span>
                                            <br />
                                            <span style={{ fontSize: '10px', color: '#9763A6' }}><span style={{ fontWeight: 'bold' }}>Zip Code: </span>{zipcode}</span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '1%', justifyContent: 'space-around' }}>
                                                <button 
                                                    style={{ border: 'none', background: 'transparent', padding: '0px', cursor: 'pointer' }} 
                                                    onClick={() => handleDeleteUser(user.id)}>
                                                    <HighlightOffOutlinedIcon 
                                                        sx={{ color: '#C42B1C' }} 
                                                        titleAccess='Delete' />
                                                </button>
                                                {editID === user.id ? (
                                                    <button 
                                                        style={{ border: 'none', background: 'transparent', padding: '0px', cursor: 'pointer' }} 
                                                        onClick={() => handleSaveUser(user.id)}>
                                                        <SaveOutlinedIcon 
                                                            sx={{ color: '#13A10E' }} 
                                                            titleAccess='Save' />
                                                    </button>
                                                ) : (
                                                    <button 
                                                        style={{ border: 'none', background: 'transparent', padding: '0px', cursor: 'pointer' }} 
                                                        onClick={() => handleEditUser(user.id, user.username)}>
                                                        <AppRegistrationOutlinedIcon 
                                                            sx={{ color: '#0078B9' }} 
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
        </div>
    )
}

export default AddNewUserComponent