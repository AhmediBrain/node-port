import React, { useState } from 'react';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import { usersTitle } from '../practiceData';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';

const NewUserAddingComponent = () => {
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
    const [filteredUsers, setfilteredUsers] = useState([]);

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

    const handleUserSubmit = (e) => {
        e.preventDefault();

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

    const handleSearchTextChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchText(searchValue);

        const filteredValue = users.filter(
            (user) => 
                user.firstname.toLowerCase().includes(searchValue) || 
                user.lastname.toLowerCase().includes(searchValue) || 
                user.username.toLowerCase().includes(searchValue)
        );

        setfilteredUsers(filteredValue);
    }

    const handleReset = () => {
        setSearchText('');
        setfilteredUsers(users);
    }

    const handleDeleteUser = (id) => {
        const updatedValue = users.filter((user) => user.id !== id);
        setUsers(updatedValue);
        setfilteredUsers(filteredUsers.filter((user) => user.id !== id));
    }

    const handleSaveUserName = (id) => {
        const savedValue = users.map(
            (user) => 
                user.id === id ? { ...user, username: editUser } : user
        );

        setUsers(savedValue);
        setEditID(null);
    }

    const handleEditUserName = (id, currentUser) => {
        setEditID(id);
        setEditUser(currentUser);
    }

    return (
        <div style={{ background: 'linear-gradient(180deg,#e9f8ef 0%, #ffffff 100%)', paddingTop: '10px' }}>
            <h5 style={{ color: '#3f5e3e', margin: '0px' }}>Add New User</h5>
            <form onSubmit={handleUserSubmit}>
                <div style={{ margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px' }}>
                    <fieldset style={{ border: 'none',textAlign: 'left' }}>
                        <legend style={{ fontSize: '13px', color: '#3f5e3e' }}>First Name</legend>
                        <input 
                            type='text' 
                            name='firstname' 
                            value={addNew.firstname} 
                            onChange={handleInfoChange} 
                            style={{ border: '1px solid #b3c5ba', borderRadius: '5px', outline: 'none', padding: '5px 8px' }} />
                    </fieldset>
                    <fieldset style={{ border: 'none',textAlign: 'left' }}>
                        <legend style={{ fontSize: '13px', color: '#3f5e3e' }}>Last Name</legend>
                        <input 
                            type='text' 
                            name='lastname' 
                            value={addNew.lastname} 
                            onChange={handleInfoChange} 
                            style={{ border: '1px solid #b3c5ba', borderRadius: '5px', outline: 'none', padding: '5px 8px' }} />
                    </fieldset>
                    <fieldset style={{ border: 'none',textAlign: 'left' }}>
                        <legend style={{ fontSize: '13px', color: '#3f5e3e' }}>Username</legend>
                        <input 
                            type='text' 
                            name='username' 
                            value={addNew.username} 
                            onChange={handleInfoChange} 
                            style={{ border: '1px solid #b3c5ba', borderRadius: '5px', outline: 'none', padding: '5px 8px' }} />
                    </fieldset>
                    <fieldset style={{ border: 'none',textAlign: 'left' }}>
                        <legend style={{ fontSize: '13px', color: '#3f5e3e' }}>Email</legend>
                        <input 
                            type='email' 
                            name='email' 
                            value={addNew.email} 
                            onChange={handleInfoChange} 
                            style={{ border: '1px solid #b3c5ba', borderRadius: '5px', outline: 'none', padding: '5px 8px' }} />
                    </fieldset>
                    <fieldset style={{ border: 'none',textAlign: 'left' }}>
                        <legend style={{ fontSize: '13px', color: '#3f5e3e' }}>Street</legend>
                        <input 
                            type='text' 
                            name='address.street' 
                            value={addNew.address.street} 
                            onChange={handleInfoChange} 
                            style={{ border: '1px solid #b3c5ba', borderRadius: '5px', outline: 'none', padding: '5px 8px' }} />
                    </fieldset>
                    <fieldset style={{ border: 'none',textAlign: 'left' }}>
                        <legend style={{ fontSize: '13px', color: '#3f5e3e' }}>Suite</legend>
                        <input 
                            type='text' 
                            name='address.suite' 
                            value={addNew.address.suite} 
                            onChange={handleInfoChange} 
                            style={{ border: '1px solid #b3c5ba', borderRadius: '5px', outline: 'none', padding: '5px 8px' }} />
                    </fieldset>
                    <fieldset style={{ border: 'none',textAlign: 'left' }}>
                        <legend style={{ fontSize: '13px', color: '#3f5e3e' }}>City</legend>
                        <input 
                            type='text' 
                            name='address.city' 
                            value={addNew.address.city} 
                            onChange={handleInfoChange} 
                            style={{ border: '1px solid #b3c5ba', borderRadius: '5px', outline: 'none', padding: '5px 8px' }} />
                    </fieldset>
                    <fieldset style={{ border: 'none',textAlign: 'left' }}>
                        <legend style={{ fontSize: '13px', color: '#3f5e3e' }}>Zip Code</legend>
                        <input 
                            type='text' 
                            name='address.zipcode' 
                            value={addNew.address.zipcode} 
                            onChange={handleInfoChange} 
                            style={{ border: '1px solid #b3c5ba', borderRadius: '5px', outline: 'none', padding: '5px 8px' }} />
                    </fieldset>
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <button 
                        type='submit' 
                        style={{ border: '2px solid #3f5e3e', borderRadius: '6px', padding: '5px 8px', color: '#3f5e3e', cursor: 'pointer' }}>
                        Add User
                    </button>
                </div>
            </form>

            <div style={{ border: '1px solid #3f5e3e', margin: '10px', padding: '8px' }}>
                <h5 style={{ color: '#3f5e3e', margin: '0px' }}>User's Information</h5>
                <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 8px 0px', gap: '2%' }}>
                    <input 
                        type='text' 
                        value={searchText} 
                        onChange={handleSearchTextChange} 
                        style={{ border: '1px solid #b3c5ba', borderRadius: '5px', outline: 'none', padding: '5px 8px' }} />
                    <button 
                        style={{ background: 'none', border: '2px solid #E96725', borderRadius: '5px', cursor: 'pointer' }} 
                        onClick={handleReset}>
                        <AutorenewOutlinedIcon 
                            titleAccess='Refresh' 
                            sx={{ color: '#E96725' }} />
                    </button>
                </div>

                <div style={{ overflowX: 'auto', margin: '10px 4px' }}>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                {usersTitle.map((user) => {
                                    return (
                                        <th key={user.id} 
                                            style={{ padding: '5px', color: '#13A10E' }}>
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
                                        <td style={{ color: '#3f5e3e', fontSize: '14px' }}>{`${user.firstname} ${user.lastname}`}</td>
                                        <td style={{ color: '#3f5e3e', fontSize: '14px' }}>
                                            {editID === user.id ? (
                                                <input 
                                                    type='text' 
                                                    value={editUser} 
                                                    onChange={(e) => setEditUser(e.target.value)} 
                                                    style={{ border: '1px solid #b3c5ba', outline: 'none', borderRadius: '5px', padding: '5px 8px' }} />
                                            ) : (
                                                <>{user.username}</>
                                            )}
                                        </td>
                                        <td style={{ color: '#3f5e3e', fontSize: '14px' }}>{user.email}</td>
                                        <td>
                                            <span style={{ color: '#3f5e3e', fontSize: '11px' }}><span style={{ fontWeight: 'bold' }}>Street: </span>{street}</span>
                                            <br />
                                            <span style={{ color: '#3f5e3e', fontSize: '11px' }}><span style={{ fontWeight: 'bold' }}>Suite: </span>{suite}</span>
                                            <br />
                                            <span style={{ color: '#3f5e3e', fontSize: '11px' }}><span style={{ fontWeight: 'bold' }}>City: </span>{city}</span>
                                            <br />
                                            <span style={{ color: '#3f5e3e', fontSize: '11px' }}><span style={{ fontWeight: 'bold' }}>Zip Code: </span>{zipcode}</span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                <button style={{ border: 'none', background: 'transparent', padding: '0px', cursor: 'pointer' }} 
                                                    onClick={() => handleDeleteUser(user.id)}>
                                                    <HighlightOffOutlinedIcon 
                                                        titleAccess='Delete' 
                                                        sx={{ color: '#C42B1C' }} />
                                                </button>
                                                {editID === user.id ? (
                                                    <button style={{ border: 'none', background: 'transparent', padding: '0px', cursor: 'pointer' }} 
                                                        onClick={() => handleSaveUserName(user.id)}>
                                                        <SaveOutlinedIcon 
                                                            titleAccess='Save' 
                                                            sx={{ color: '#13A10E' }} />
                                                    </button>
                                                ) : (
                                                    <button style={{ border: 'none', background: 'transparent', padding: '0px', cursor: 'pointer' }} 
                                                        onClick={() => handleEditUserName(user.id, user.username)}>
                                                        <AppRegistrationOutlinedIcon 
                                                            titleAccess='Edit' 
                                                            sx={{ color: '#0078B9' }} />
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

export default NewUserAddingComponent