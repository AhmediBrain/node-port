import React, { useState } from 'react';
import { usersTitle } from '../practiceData';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
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
    const [editUser, setEditUser] = useState('');
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
        )
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

    const handleReset = () => {
        setSearchText('');
        setFilteredUsers(users);
    }

    const handleUserChange = (e) => {
        setEditUser(e.target.value);
    }

    const handleDeleteInfo = (id) => {
        const updatedInfo = users.filter((user) => user.id !== id);
        setUsers(updatedInfo);
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
        <div style={{ backgroundColor: '#E8EAFA', padding: '8px' }}>
            <h4 style={{ color: '#3A0B3A' }}>Add New User</h4>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <fieldset style={{ border: 'none', textAlign: 'left' }}>
                    <legend style={{ fontSize: '13px', fontWeight: 'bold', color: '#702388' }}>
                        <span style={{ color: '#eb3929' }}>*</span>First Name
                    </legend>
                    <input 
                        type='text' 
                        name='firstname' 
                        value={addNew.firstname} 
                        onChange={handleInfoChange} 
                        style={{ border: '1px solid #da88f3', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ border: 'none', textAlign: 'left' }}>
                    <legend style={{ fontSize: '13px', fontWeight: 'bold', color: '#702388' }}>
                        <span style={{ color: '#eb3929' }}>*</span>Last Name
                    </legend>
                    <input 
                        type='text' 
                        name='lastname' 
                        value={addNew.lastname} 
                        onChange={handleInfoChange} 
                        style={{ border: '1px solid #da88f3', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ border: 'none', textAlign: 'left' }}>
                    <legend style={{ fontSize: '13px', fontWeight: 'bold', color: '#702388' }}>
                        <span style={{ color: '#eb3929' }}>*</span>User Name
                    </legend>
                    <input 
                        type='text' 
                        name='username' 
                        value={addNew.username} 
                        onChange={handleInfoChange} 
                        style={{ border: '1px solid #da88f3', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ border: 'none', textAlign: 'left' }}>
                    <legend style={{ fontSize: '13px', fontWeight: 'bold', color: '#702388' }}>
                        <span style={{ color: '#eb3929' }}>*</span>Email
                    </legend>
                    <input 
                        type='email' 
                        name='email' 
                        value={addNew.email} 
                        onChange={handleInfoChange} 
                        style={{ border: '1px solid #da88f3', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ border: 'none', textAlign: 'left' }}>
                    <legend style={{ fontSize: '13px', fontWeight: 'bold', color: '#702388' }}>Street</legend>
                    <input 
                        type='text' 
                        name='address.street' 
                        value={addNew.address.street} 
                        onChange={handleInfoChange} 
                        style={{ border: '1px solid #da88f3', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ border: 'none', textAlign: 'left' }}>
                    <legend style={{ fontSize: '13px', fontWeight: 'bold', color: '#702388' }}>Suite</legend>
                    <input 
                        type='text' 
                        name='address.suite' 
                        value={addNew.address.suite} 
                        onChange={handleInfoChange} 
                        style={{ border: '1px solid #da88f3', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ border: 'none', textAlign: 'left' }}>
                    <legend style={{ fontSize: '13px', fontWeight: 'bold', color: '#702388' }}>City</legend>
                    <input 
                        type='text' 
                        name='address.city' 
                        value={addNew.address.city} 
                        onChange={handleInfoChange} 
                        style={{ border: '1px solid #da88f3', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <fieldset style={{ border: 'none', textAlign: 'left' }}>
                    <legend style={{ fontSize: '13px', fontWeight: 'bold', color: '#702388' }}>Zip Code</legend>
                    <input 
                        type='text' 
                        name='address.zipcode' 
                        value={addNew.address.zipcode} 
                        onChange={handleInfoChange} 
                        style={{ border: '1px solid #da88f3', outline: 'none', padding: '5px 8px' }} />
                </fieldset>
                <div style={{ margin: '10px' }}>
                    <button 
                        style={{ border: '1px solid #702388', color: '#702388', fontWeight: 'bold', padding: '5px 8px', borderRadius: '5px', cursor: 'pointer' }} 
                        onClick={handleAddUser}>
                        Add User
                    </button>
                </div>
            </div>

            <div>
                <div>
                    <h5 style={{ color: '#3A0B3A' }}>User's Information</h5>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '2%', margin: '0 10px 10px 0' }}>
                    <input 
                        type='text' 
                        value={searchText} 
                        onChange={handleSearchChange} 
                        style={{ border: '1px solid #da88f3', outline: 'none', padding: '5px 8px' }} />
                    <button 
                        onClick={handleReset} 
                        style={{ border: '1px solid #E78D00', color: '#E78D00', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
                        Reset
                    </button>
                </div>
                <div style={{ display: 'flex', overflowX: 'auto' }}>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                {usersTitle.map((user) => {
                                    return (
                                        <th key={user.id} 
                                            style={{ color: '#da88f3', padding: '5px' }}>
                                            {user.title}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {(searchText ? filteredUsers : users).map((user) => {
                                const { street, suite, city, zipcode } = user.address;

                                return(
                                    <tr key={user.id}>
                                        <td style={{ fontSize: '14px', color: '#0075B7' }}>{user.firstname}</td>
                                        <td style={{ fontSize: '14px', color: '#0075B7' }}>{user.lastname}</td>
                                        <td style={{ fontSize: '14px', color: '#0075B7' }}>
                                            {editID === user.id ? (
                                                <input 
                                                    type='text' 
                                                    value={editUser} 
                                                    onChange={handleUserChange} 
                                                    style={{ border: '1px solid #da88f3', outline: 'none', padding: '5px 8px' }} />
                                            ) : (
                                                <span>{user.username}</span>
                                            )}
                                        </td>
                                        <td style={{ fontSize: '14px', color: '#0075B7' }}>{user.email}</td>
                                        <td>
                                            <span style={{ fontSize: '10px', color: '#0075B7' }}><span style={{ fontWeight: 'bold', color: '#da88f3' }}>Street: </span>{street}</span>
                                            <br />
                                            <span style={{ fontSize: '10px', color: '#0075B7' }}><span style={{ fontWeight: 'bold', color: '#da88f3' }}>Suite: </span>{suite}</span>
                                            <br />
                                            <span style={{ fontSize: '10px', color: '#0075B7' }}><span style={{ fontWeight: 'bold', color: '#da88f3' }}>City: </span>{city}</span>
                                            <br />
                                            <span style={{ fontSize: '10px', color: '#0075B7' }}><span style={{ fontWeight: 'bold', color: '#da88f3' }}>Zip Code: </span>{zipcode}</span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                <button 
                                                    style={{ border: 'none', padding: '0px', cursor: 'pointer' }} 
                                                    onClick={() => handleDeleteInfo(user.id)}>
                                                    <HighlightOffOutlinedIcon 
                                                        sx={{ color: '#C42B1C' }} 
                                                        titleAccess='Delete' />
                                                </button>
                                                {editID === user.id ? (
                                                    <button 
                                                        style={{ border: 'none', padding: '0px', cursor: 'pointer' }} 
                                                        onClick={() => handleSaveUser(user.id)}>
                                                        <SaveOutlinedIcon 
                                                            sx={{ color: '#259745' }} 
                                                            titleAccess='Save' />
                                                    </button>
                                                ) : (
                                                    <button 
                                                        style={{ border: 'none', padding: '0px', cursor: 'pointer' }} 
                                                        onClick={() => handleEditUser(user.id, user.username)}>
                                                        <EditNoteOutlinedIcon 
                                                            sx={{ color: '#0075B7', fontSize: '30px' }} 
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

export default UsersInformationComponent