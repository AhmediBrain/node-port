import React, { useState } from 'react'
import { usersTitle } from './practiceData';

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
    const [searchTerm, setSearchTerm] = useState();
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
            console.log('User ID#', userID);
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
            )
        }
    }

    const handleDeleteInfo = (id) => {
        const updatedInfo = users.filter((user) => user.id !== id);
        setUsers(updatedInfo);
    }

    console.log('Add New:', addNew);

    const handleSearchChange = (e) => {
        const searchInfo = e.target.value.toLowerCase();
        setSearchTerm(searchInfo);
        console.log('Search Info:', searchInfo);

        const filteredValue = users.filter(
            (user) => 
                user.firstname.toLowerCase().includes(searchInfo) || 
                user.lastname.toLowerCase().includes(searchInfo) || 
                user.username.toLowerCase().includes(searchInfo) || 
                user.address.zipcode.toLowerCase().includes(searchInfo)
        );

        setFilteredUsers(filteredValue);
    }

    const handleReset = () => {
        setSearchTerm('');
        setFilteredUsers(users);
    }

    return (
        <div>
            <h5>New User Function</h5>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginBottom: '10px' }}>
                    <label>First Name:</label>
                    <input 
                        type='text' 
                        name='firstname' 
                        value={addNew.firstname} 
                        onChange={handleInfoChange} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginBottom: '10px' }}>
                    <label>Last Name:</label>
                    <input 
                        type='text' 
                        name='lastname' 
                        value={addNew.lastname} 
                        onChange={handleInfoChange} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginBottom: '10px' }}>
                    <label>User Name:</label>
                    <input 
                        type='text' 
                        name='username' 
                        value={addNew.username} 
                        onChange={handleInfoChange} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginBottom: '10px' }}>
                    <label>User Email:</label>
                    <input 
                        type='text' 
                        name='email' 
                        value={addNew.email} 
                        onChange={handleInfoChange} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginBottom: '10px' }}>
                    <label>User Street:</label>
                    <input 
                        type='text' 
                        name='address.street' 
                        value={addNew.address.street} 
                        onChange={handleInfoChange} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginBottom: '10px' }}>
                    <label>User Suite:</label>
                    <input 
                        type='text' 
                        name='address.suite' 
                        value={addNew.address.suite} 
                        onChange={handleInfoChange} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginBottom: '10px' }}>
                    <label>User City:</label>
                    <input 
                        type='text' 
                        name='address.city' 
                        value={addNew.address.city} 
                        onChange={handleInfoChange} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginBottom: '10px' }}>
                    <label>Zip Code:</label>
                    <input 
                        type='text' 
                        name='address.zipcode' 
                        value={addNew.address.zipcode} 
                        onChange={handleInfoChange} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginBottom: '10px' }}>
                    <button 
                        onClick={handleAddUser}>
                        Add New User
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' , justifyContent: 'center', marginTop: '16px', overflowX: 'auto' }}>
                <h5>Users Information</h5>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1%', margin: '0px 10px 10px 0' }}>
                    <input 
                        type='text' 
                        placeholder='Search ...'
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                        style={{ padding: '3px 5px' }} />
                    <button 
                        onClick={handleReset}>
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
                        {(searchTerm ? filteredUsers : users).map((user) => {
                            const { street, suite, city, zipcode } = user.address;

                            return (
                                <tr key={user.id}>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.username}</td>
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
                                        <button 
                                            onClick={() => handleDeleteInfo(user.id)}>
                                            Delete
                                        </button>
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