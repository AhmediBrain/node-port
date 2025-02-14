import React, { useState } from 'react'
import { usersTitle } from './practiceData';

const AddNewUserComponent = () => {
    const [addUser, setAddUser] = useState(
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
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [editId, setEditId] = useState(null);
    const [userInfo, setUserInfo] = useState('');

    const handleInfoChange = (e) => {
        const { name, value } = e.target;

        if(name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setAddUser((prevValue) => ({
                ...prevValue,
                address: {
                    ...prevValue.address,
                    [addressField]: value
                }
            }));
        } 
        else {
            setAddUser((prevValue) => ({
                ...prevValue,
                [name]: value
            }));
        }
    }

    const handleAddUser = () => {
        if(!addUser.firstname || !addUser.lastname || !addUser.username || !addUser.email) {
            alert('Please fill all the required fields.');
            return;
        } 
        else {
            const userID = Date.now();
            setUsers([
                ...users,
                { ...addUser, id: userID }
            ]);
        }

        setAddUser(
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
        )
    }

    const handleUserInfoChange = (e) => {
        setUserInfo(e.target.value);
    }

    const handleDeleteInfo = (id) => {
        const usersValue = users.filter((user) => user.id !== id);
        setUsers(usersValue);
    }

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

    const handleResetFilter = () => {
        setSearchText('');
        setFilteredUsers(users);
    }

    const handleEditInfo  = (id, username) => {
        setEditId(id);
        setUserInfo(username);
    }

    const handleSaveInfo = (id) => {
        const savedValue = users.map(
            (user) => 
                user.id === id ? { ...user, username: userInfo } : user
        );

        setUsers(savedValue);
        console.log('Saved Value:', savedValue);
        setEditId(null);
    }

    return (
        <div style={{ marginBottom: '10px', backgroundColor: '#e2f0f8', padding: '5px' }}>
            <h5 style={{ color: '#969494' }}>Add New User Function</h5>
            <div>
                <span style={{ color: '#0077B5', fontSize: '13px', fontWeight: 'bold' }}>User's Information</span>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1%', padding: '8px 16px' }}>
                    <div style={{ width: '25%' }}>
                        <label style={{ fontSize: '14px', color: '#1e81b6' }}><span style={{ color: '#DE3730' }}>*</span>First Name:</label>
                    </div>
                    <div style={{ width: '70%' }}>
                        <input 
                            style={{ width: '100%', padding: '5px', border: '1px solid #8ad2f8', outline: 'none' }} 
                            type='text' 
                            name='firstname'
                            value={addUser.firstname} 
                            onChange={handleInfoChange} />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1%', padding: '8px 16px' }}>
                    <div style={{ width: '25%' }}>
                        <label style={{ fontSize: '14px', color: '#1e81b6' }}><span style={{ color: '#DE3730' }}>*</span>Last Name:</label>
                    </div>
                    <div style={{ width: '70%' }}>
                        <input 
                            style={{ width: '100%', padding: '5px', border: '1px solid #8ad2f8', outline: 'none' }} 
                            type='text' 
                            name='lastname' 
                            value={addUser.lastname} 
                            onChange={handleInfoChange} />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1%', padding: '8px 16px' }}>
                    <div style={{ width: '25%' }}>
                        <label style={{ fontSize: '14px', color: '#1e81b6' }}><span style={{ color: '#DE3730' }}>*</span>User Name:</label>
                    </div>
                    <div style={{ width: '70%' }}>
                        <input 
                            style={{ width: '100%', padding: '5px', border: '1px solid #8ad2f8', outline: 'none' }} 
                            type='text' 
                            name='username'
                            value={addUser.username} 
                            onChange={handleInfoChange} />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1%', padding: '8px 16px' }}>
                    <div style={{ width: '25%' }}>
                        <label style={{ fontSize: '14px', color: '#1e81b6' }}><span style={{ color: '#DE3730' }}>*</span>Email:</label>
                    </div>
                    <div style={{ width: '70%' }}>
                        <input 
                            style={{ width: '100%', padding: '5px', border: '1px solid #8ad2f8', outline: 'none' }} 
                            type='text' 
                            name='email' 
                            value={addUser.email} 
                            onChange={handleInfoChange} />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1%', padding: '8px 16px' }}>
                    <div style={{ width: '25%' }}>
                        <label style={{ fontSize: '14px', color: '#1e81b6' }}>Street:</label>
                    </div>
                    <div style={{ width: '70%' }}>
                        <input 
                            style={{ width: '100%', padding: '5px', border: '1px solid #8ad2f8', outline: 'none' }} 
                            type='text' 
                            name='address.street'
                            value={addUser.address.street} 
                            onChange={handleInfoChange} />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1%', padding: '8px 16px' }}>
                    <div style={{ width: '25%' }}>
                        <label style={{ fontSize: '14px', color: '#1e81b6' }}>Suite:</label>
                    </div>
                    <div style={{ width: '70%' }}>
                        <input 
                            style={{ width: '100%', padding: '5px', border: '1px solid #8ad2f8', outline: 'none' }} 
                            type='text' 
                            name='address.suite' 
                            value={addUser.address.suite} 
                            onChange={handleInfoChange} />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1%', padding: '8px 16px' }}>
                    <div style={{ width: '25%' }}>
                        <label style={{ fontSize: '14px', color: '#1e81b6' }}>City:</label>
                    </div>
                    <div style={{ width: '70%' }}>
                        <input 
                            style={{ width: '100%', padding: '5px', border: '1px solid #8ad2f8', outline: 'none' }} 
                            type='text' 
                            name='address.city'
                            value={addUser.address.city} 
                            onChange={handleInfoChange} />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1%', padding: '8px 16px' }}>
                    <div style={{ width: '25%' }}>
                        <label style={{ fontSize: '14px', color: '#1e81b6' }}>Zip Code:</label>
                    </div>
                    <div style={{ width: '70%' }}>
                        <input 
                            style={{ width: '100%', padding: '5px', border: '1px solid #8ad2f8', outline: 'none' }} 
                            type='text' 
                            name='address.zipcode' 
                            value={addUser.address.zipcode} 
                            onChange={handleInfoChange} />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1%', padding: '8px 16px' }}>
                    <button 
                        style={{ padding: '5px', border: '1px solid #8ad2f8', borderRadius: '5px', color: '#0077B5', cursor: 'pointer' }} 
                        onClick={handleAddUser}>
                        Add User
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1%', margin: '0 10px 10px 0' }}>
                    <input 
                        type='text' 
                        style={{ padding: '5px', border: '1px solid #8ad2f8', outline: 'none' }} 
                        value={searchText} 
                        onChange={handleSearchChange} />
                    <button 
                        onClick={handleResetFilter} 
                        style={{ border: '1px solid #E96725', borderRadius: '4px', backgroundColor: '#FFFFFF', fontWeight: 'bold', color: '#E96725', padding: '5px', cursor: 'pointer' }}>
                        Reset
                    </button>
                </div>
                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            {usersTitle.map((user) => {
                                return (
                                    <th key={user.id}>{user.title}</th>
                                )
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {(searchText ? filteredUsers : users).map((user) => {
                            const { street, suite, city, zipcode } = user.address;

                            return (
                                <tr key={user.id}>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    {/* <td>{user.username}</td> */}
                                    <td>
                                        {editId === user.id ? (
                                            <input 
                                                type='text' 
                                                value={userInfo} 
                                                onChange={handleUserInfoChange} />
                                        ) : (
                                            <span>{user.username}</span>
                                        )}
                                    </td>
                                    <td>{user.email}</td>
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
                                                onClick={() => handleDeleteInfo(user.id)} 
                                                style={{ border: '1px solid #E96725', borderRadius: '4px', backgroundColor: '#FFFFFF', fontWeight: 'bold', color: '#E96725', padding: '5px', cursor: 'pointer' }}>
                                                Delete
                                            </button>
                                            {editId === user.id ? (
                                                <button style={{ border: '1px solid #13A10E', borderRadius: '4px', backgroundColor: '#FFFFFF', color: '#13A10E', fontWeight: 'bold', cursor: 'pointer', padding: '5px' }} 
                                                    onClick={() => handleSaveInfo(user.id)}>
                                                    Save
                                                </button>
                                            ) : (
                                                <button style={{ border: '1px solid #8ad2f8', borderRadius: '4px', backgroundColor: '#FFFFFF', color: '#0077B5', fontWeight: 'bold', cursor: 'pointer', padding: '5px' }} 
                                                    onClick={() => handleEditInfo(user.id, user.firstname)}>
                                                    Edit
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

export default AddNewUserComponent