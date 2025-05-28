import React, { useState } from 'react';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import { usersTitle } from '../practiceData';

const DynamicNewUserComponent = () => {
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

    const infoData = [
        {
            id: 1,
            name: 'firstname',
            label: 'First Name',
            value: addNew.firstname,
            type: 'text',
            required: 1
        },
        {
            id: 2,
            name: 'lastname',
            label: 'Last Name',
            value: addNew.lastname,
            type: 'text',
            required: 1
        },
        {
            id: 3,
            name: 'username',
            label: 'Username',
            value: addNew.username,
            type: 'text',
            required: 1
        },
        {
            id: 4,
            name: 'email',
            label: 'Email',
            value: addNew.email,
            type: 'email',
            required: 1
        },
        {
            id: 5,
            name: 'address.street',
            label: 'Street',
            value: addNew.address.street,
            type: 'text',
            required: 0
        },
        {
            id: 6,
            name: 'address.suite',
            label: 'Suite',
            value: addNew.address.suite,
            type: 'text',
            required: 0
        },
        {
            id: 7,
            name: 'address.city',
            label: 'City',
            value: addNew.address.city,
            type: 'text',
            required: 0
        },
        {
            id: 8,
            name: 'address.zipcode',
            label: 'Zip Code',
            value: addNew.address.zipcode,
            type: 'text',
            required: 0
        }
    ];

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

    const handleAddNewSubmit = (e) => {
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

        setFilteredUser(filteredValue);
    }

    const handleReset = () => {
        setSearchText('');
        setFilteredUser(users);
    }

    const handleDeleteRow = (id) => {
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
    
    const handleEditUser = (id, username) => {
        setEditID(id);
        setEditUser(username);
    }

    return (
        <div style={{ padding: '8px', backgroundColor: '#F6EFE8' }}>
            <h5 style={{ color: '#3E5A4D', margin: '0px' }}>Dynamic Add New User</h5>
            <form onSubmit={handleAddNewSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '16px 0px 10px 0px' }}>
                    {infoData.map((info) => {
                        return (
                            <fieldset key={info.id} 
                                style={{ border: 'none', textAlign: 'left' }}>
                                <legend style={{ color: '#3E5A4D', fontSize: '14px' }}>
                                    {info.required === 1 ? (
                                        <>
                                            <span style={{ color: '#C42B1C' }}>*</span>{info.label}
                                        </>
                                    ) : (
                                        <>{info.label}</>
                                    )}
                                </legend>
                                <input 
                                    type={info.type} 
                                    name={info.name} 
                                    value={info.value} 
                                    onChange={handleInfoChange} 
                                    style={{ border: '1px solid #969c99', borderRadius: '5px', outline: 'none', padding: '5px 8px' }} />
                            </fieldset>
                        )
                    })}
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <button 
                        type='submit' 
                        style={{ border: '2px solid #3E5A4D', borderRadius: '5px', color: '#3E5A4D', padding: '5px 8px', cursor: 'pointer' }}>
                        Add User
                    </button>
                </div>
            </form>

            <div style={{ border: '1px solid #a9acaa', padding: '8px' }}>
                <h5 style={{ margin: '0px', color: '#3E5A4D' }}>User's Information</h5>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1%', margin: '10px 8px 0px 0px' }}>
                    <input 
                        type='text' 
                        value={searchText} 
                        onChange={handleSearchTextChange} 
                        style={{ border: '1px solid #969c99', borderRadius: '5px', outline: 'none', padding: '5px 8px' }} />
                    <button 
                        style={{ border: '2px solid #E96725', borderRadius: '5px', cursor: 'pointer' }} 
                        onClick={handleReset}>
                        <CachedOutlinedIcon 
                            titleAccess='Refresh' 
                            sx={{ color: '#E96725' }} />
                    </button>
                </div>
                <div style={{ overflowX: 'auto', margin: '16px 0px' }}>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                {usersTitle.map((user) => {
                                    return (
                                        <th key={user.id} 
                                            style={{ padding: '5px', color: '#2e4239' }}>
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
                                        <td style={{ color: '#595c5b', fontSize: '14px' }}>{`${user.firstname} ${user.lastname}`}</td>
                                        <td style={{ color: '#595c5b', fontSize: '14px' }}>
                                            {editID === user.id ? (
                                                <input 
                                                    type='text' 
                                                    value={editUser} 
                                                    onChange={(e) => setEditUser(e.target.value)} 
                                                    style={{ border: '1px solid #969c99', outline: 'none', borderRadius: '5px', padding: '5px 8px' }} />
                                            ) : (
                                                <>{user.username}</>
                                            )}
                                        </td>
                                        <td style={{ color: '#595c5b', fontSize: '14px' }}>{user.email}</td>
                                        <td>
                                            <span style={{ fontSize: '11px', color: '#595c5b' }}><span style={{ fontWeight: 'bold' }}>Street: </span>{street}</span>
                                            <br />
                                            <span style={{ fontSize: '11px', color: '#595c5b' }}><span style={{ fontWeight: 'bold' }}>Suite: </span>{suite}</span>
                                            <br />
                                            <span style={{ fontSize: '11px', color: '#595c5b' }}><span style={{ fontWeight: 'bold' }}>City: </span>{city}</span>
                                            <br />
                                            <span style={{ fontSize: '11px', color: '#595c5b' }}><span style={{ fontWeight: 'bold' }}>Zip Code: </span>{zipcode}</span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                <button style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                                    onClick={() => handleDeleteRow(user.id)}>
                                                    <HighlightOffOutlinedIcon 
                                                        titleAccess='Delete' 
                                                        sx={{ color: '#C42B1C', fontSize: '30px' }} />
                                                </button>
                                                {editID === user.id ? (
                                                    <button style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                                        onClick={() => handleSaveUser(user.id)}>
                                                        <SaveOutlinedIcon 
                                                            titleAccess='Save' 
                                                            sx={{ color: '#13A10E', fontSize: '30px' }} />
                                                    </button>
                                                ) : (
                                                    <button style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                                        onClick={() => handleEditUser(user.id, user.username)}>
                                                        <AppRegistrationOutlinedIcon 
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
        </div>
    )
}

export default DynamicNewUserComponent