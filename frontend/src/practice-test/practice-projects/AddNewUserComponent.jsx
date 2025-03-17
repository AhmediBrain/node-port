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

    const handleAddNewUser = () => {
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

    console.log('New User:', addNew);

    const handleSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchText(searchValue);
    }

    const handleDeleteUser = (id) => {
        const updatedUser = users.filter((user) => user.id !== id);
        setUsers(updatedUser);
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
        <div style={{ backgroundColor: '#f5f0f7' }}>
            <h4 style={{ color: '#974eac' }}>Add New User</h4>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <fieldset style={{ border: 'none', textAlign: 'left' }}>
                    <legend style={{ fontSize: '13px', color: '#974eac' }}>First Name</legend>
                    <input 
                        type='text' 
                        name='firstname' 
                        value={addNew.firstname} 
                        onChange={handleInfoChange} 
                        style={{ border: '1px solid #e6acf7', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ border: 'none', textAlign: 'left' }}>
                    <legend style={{ fontSize: '13px', color: '#974eac' }}>Last Name</legend>
                    <input 
                        type='text' 
                        name='lastname' 
                        value={addNew.lastname} 
                        onChange={handleInfoChange} 
                        style={{ border: '1px solid #e6acf7', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ border: 'none', textAlign: 'left' }}>
                    <legend style={{ fontSize: '13px', color: '#974eac' }}>User Name</legend>
                    <input 
                        type='text' 
                        name='username' 
                        value={addNew.username} 
                        onChange={handleInfoChange} 
                        style={{ border: '1px solid #e6acf7', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ border: 'none', textAlign: 'left' }}>
                    <legend style={{ fontSize: '13px', color: '#974eac' }}>Email</legend>
                    <input 
                        type='text' 
                        name='email' 
                        value={addNew.email} 
                        onChange={handleInfoChange} 
                        style={{ border: '1px solid #e6acf7', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ border: 'none', textAlign: 'left' }}>
                    <legend style={{ fontSize: '13px', color: '#974eac' }}>Street</legend>
                    <input 
                        type='text' 
                        name='address.street' 
                        value={addNew.address.street} 
                        onChange={handleInfoChange} 
                        style={{ border: '1px solid #e6acf7', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ border: 'none', textAlign: 'left' }}>
                    <legend style={{ fontSize: '13px', color: '#974eac' }}>Suite</legend>
                    <input 
                        type='text' 
                        name='address.suite' 
                        value={addNew.address.suite} 
                        onChange={handleInfoChange} 
                        style={{ border: '1px solid #e6acf7', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ border: 'none', textAlign: 'left' }}>
                    <legend style={{ fontSize: '13px', color: '#974eac' }}>City</legend>
                    <input 
                        type='text' 
                        name='address.city' 
                        value={addNew.address.city} 
                        onChange={handleInfoChange} 
                        style={{ border: '1px solid #e6acf7', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ border: 'none', textAlign: 'left' }}>
                    <legend style={{ fontSize: '13px', color: '#974eac' }}>Zip Code</legend>
                    <input 
                        type='text' 
                        name='address.zipcode' 
                        value={addNew.address.zipcode} 
                        onChange={handleInfoChange} 
                        style={{ border: '1px solid #e6acf7', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
            </div>
            <div style={{ margin: '10px' }}>
                <button 
                    style={{ border: '2px solid #c3adca', color: '#9763A6', fontWeight: 'bold', borderRadius: '5px', padding: '5px 8px', cursor: 'pointer' }} 
                    onClick={handleAddNewUser}>
                    Add User
                </button>
            </div>

            <div style={{ marginTop: '20px' }}>
                <div>
                    <h5 style={{ color: '#974eac' }}>User's Information</h5>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1%', margin: '0 10px 10px 0' }}>
                    <input 
                        type='text' 
                        value={searchText} 
                        onChange={handleSearchChange} 
                        style={{ border: '1px solid #e6acf7', outline: 'none', padding: '5px 8px' }} 
                        placeholder='Search ...' />
                    <button 
                        style={{ border: '2px solid #EEA024', color: '#EEA024', fontWeight: 'bold', borderRadius: '5px', cursor: 'pointer' }}>
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
                                            style={{ padding: '8px', color: '#b79ebe' }}>
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
                                        <td style={{ fontSize: '13px', color: '#9763A6' }}>{user.firstname}</td>
                                        <td style={{ fontSize: '13px', color: '#9763A6' }}>{user.lastname}</td>
                                        <td style={{ fontSize: '13px', color: '#9763A6' }}>
                                            {editID === user.id ? (
                                                <input 
                                                    type='text' 
                                                    value={editUser} 
                                                    onChange={(e) => setEditUser(e.target.value)} 
                                                    style={{ border: '1px solid #e6acf7', outline: 'none', padding: '5px 8px' }} />
                                            ) : (
                                                <span>{user.username}</span>
                                            )}
                                        </td>
                                        <td style={{ fontSize: '13px', color: '#9763A6' }}>{user.email}</td>
                                        <td>
                                            <span style={{ color: '#9763A6', fontSize: '10px' }}><span style={{ fontWeight: 'bold' }}>Street: </span>{street}</span>
                                            <br />
                                            <span style={{ color: '#9763A6', fontSize: '10px' }}><span style={{ fontWeight: 'bold' }}>Suite: </span>{suite}</span>
                                            <br />
                                            <span style={{ color: '#9763A6', fontSize: '10px' }}><span style={{ fontWeight: 'bold' }}>City: </span>{city}</span>
                                            <br />
                                            <span style={{ color: '#9763A6', fontSize: '10px' }}><span style={{ fontWeight: 'bold' }}>Zip Code: </span>{zipcode}</span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                <button 
                                                    style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                                    onClick={() => handleDeleteUser(user.id)}>
                                                    <HighlightOffOutlinedIcon 
                                                        sx={{ color: '#C42B1C' }} 
                                                        titleAccess='Delete' />
                                                </button>
                                                <button 
                                                    style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                                    onClick={() => handleSaveUser(user.id)}>
                                                    <SaveOutlinedIcon 
                                                        sx={{ color: '#289847' }} 
                                                        titleAccess='Save' />
                                                </button>
                                                <button 
                                                    style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                                    onClick={() => handleEditUser(user.id, user.username)}>
                                                    <AppRegistrationOutlinedIcon 
                                                        sx={{ color: '#0079BA' }} 
                                                        titleAccess='Edit' />
                                                </button>
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