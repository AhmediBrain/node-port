import React, { useState } from 'react';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import { usersTitle } from '../../practice-test/practiceData';

const ProjectsAddNewUserComponent = () => {
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

    const newuserList = [
        {
            id: 1,
            label: 'First Name',
            name: 'firstname',
            value: addNew.firstname,
            required: 1,
            type: 'text'
        },
        {
            id: 2,
            label: 'Last Name',
            name: 'lastname',
            value: addNew.lastname,
            required: 1,
            type: 'text'
        },
        {
            id: 3,
            label: 'Username',
            name: 'username',
            value: addNew.username,
            required: 1,
            type: 'text'
        },
        {
            id: 4,
            label: 'Email',
            name: 'email',
            value: addNew.email,
            required: 1,
            type: 'email'
        },
        {
            id: 5,
            label: 'Street',
            name: 'address.street',
            value: addNew.address.street,
            required: 0,
            type: 'text'
        },
        {
            id: 6,
            label: 'Suite',
            name: 'address.suite',
            value: addNew.address.suite,
            required: 0,
            type: 'text'
        },
        {
            id: 7,
            label: 'City',
            name: 'address.city',
            value: addNew.address.city,
            required: 0,
            type: 'text'
        },
        {
            id: 8,
            label: 'Zip Code',
            name: 'address.zipcode',
            value: addNew.address.zipcode,
            required: 0,
            type: 'text'
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

    const handleNewUserSubmit = (e) => {
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
        const updatedRow = users.filter((user) => user.id !== id);
        setUsers(updatedRow);

        setFilteredUser(filteredUser.filter((user) => user.id !== id));
    }

    const handleSaveUsername = (id) => {
        const savedValue = users.map(
            (user) => 
                user.id === id ? { ...user, username: editUser } : user
        );

        setUsers(savedValue);
        setEditID(null);
    }

    const handleEditUsername = (id, currentUser) => {
        setEditID(id);
        setEditUser(currentUser);
    }

    return (
        <div style={{ 
                background: 'linear-gradient(180deg,rgba(229, 220, 243, 1) 0%, rgba(255, 255, 255, 1) 100%)',
                padding: '16px' }}>
            <h5 style={{ margin: '0px', color: '#9f8bc0' }}>Add New User</h5>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '16px' }}>
                <form onSubmit={handleNewUserSubmit}>
                    {newuserList.map((info) => {
                        return (
                            <fieldset key={info.id} 
                                style={{ border: 'none', marginBottom: '5px' }}>
                                <legend style={{ textAlign: 'left', fontSize: '14px', color: '#715d92' }}>
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
                                    style={{ border: '1px solid #9a8faa', outline: 'none', padding: '5px 8px', borderRadius: '6px' }} />
                            </fieldset>
                        )
                    })}
                    <div style={{ marginTop: '16px' }}>
                        <button style={{ border: '2px solid #715d92', color: '#715d92', borderRadius: '6px', padding: '5px 8px', cursor: 'pointer' }} 
                            type='submit'>
                            Add User
                        </button>
                    </div>
                </form>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', margin: '16px 5px', border: '1px solid #969597', padding: '8px' }}>
                <h5 style={{ color: '#9f8bc0', margin: '0px' }}>User's Information</h5>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '2%', margin: '10px' }}>
                    <input 
                        type='text' 
                        value={searchText} 
                        onChange={handleSearchTextChange} 
                        style={{ border: '1px solid #9a8faa', outline: 'none', padding: '5px 8px', borderRadius: '6px' }} />
                    <button style={{ border: '2px solid #E96725', borderRadius: '6px', background: 'transparent', cursor: 'pointer' }} 
                        onClick={handleReset}>
                        <AutorenewOutlinedIcon 
                            titleAccess='Refresh' 
                            sx={{ color: '#E96725' }} />
                    </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                {usersTitle.map((user) => {
                                    return (
                                        <th key={user.id} 
                                            style={{ padding: '5px', color: '#7f6f97' }}>
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
                                    <tr key={user.id} 
                                        style={{ fontSize: '14px', color: '#565458' }}>
                                        <td>{`${user.firstname} ${user.lastname}`}</td>
                                        <td>
                                            {editID === user.id ? (
                                                <input 
                                                    type='text' 
                                                    value={editUser} 
                                                    onChange={(e) => setEditUser(e.target.value)} 
                                                    style={{ border: '1px solid #9a8faa', outline: 'none', borderRadius: '6px', padding: '5px 8px' }} />
                                            ) : (
                                                <>{user.username}</>
                                            )}
                                        </td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span style={{ fontSize: '11px' }}><span style={{ fontWeight: 'bold' }}>Street: </span>{street}</span>
                                            <br />
                                            <span style={{ fontSize: '11px' }}><span style={{ fontWeight: 'bold' }}>Suite: </span>{suite}</span>
                                            <br />
                                            <span style={{ fontSize: '11px' }}><span style={{ fontWeight: 'bold' }}>City: </span>{city}</span>
                                            <br />
                                            <span style={{ fontSize: '11px' }}><span style={{ fontWeight: 'bold' }}>Zip Code: </span>{zipcode}</span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                <button style={{ border: 'none', background: 'transparent', padding: '0px', cursor: 'pointer' }} 
                                                    onClick={() => handleDeleteRow(user.id)}>
                                                    <HighlightOffOutlinedIcon 
                                                        titleAccess='Delete' 
                                                        sx={{ color: '#C42B1C', fontSize: '30px' }} />
                                                </button>
                                                {editID === user.id ? (
                                                    <button style={{ border: 'none', background: 'transparent', padding: '0px', cursor: 'pointer' }} 
                                                        onClick={() => handleSaveUsername(user.id)}>
                                                        <SaveOutlinedIcon 
                                                            titleAccess='Save' 
                                                            sx={{ color: '#13A10E', fontSize: '30px' }} />
                                                    </button>
                                                ) : (
                                                    <button style={{ border: 'none', background: 'transparent', padding: '0px', cursor: 'pointer' }} 
                                                        onClick={() => handleEditUsername(user.id, user.username)}>
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

export default ProjectsAddNewUserComponent