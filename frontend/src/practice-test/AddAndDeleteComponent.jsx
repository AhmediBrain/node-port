import React, { useState } from 'react';
import { StyledButton, StyledDiv, StyledField, StyledInput, StyledPara, Table, TableCell, TableHeader, TableHeaderCell, TableRow } from './StyledComponent';
import { usersTitle } from './practiceData';

const AddAndDeleteComponent = () => {
    const [users, setUsers] = useState([]);

    const [newUser, setNewUser] = useState(
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if(name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setNewUser((prevValue) => ({
                ...prevValue,
                address: {
                    ...prevValue.address,
                    [addressField]: value
                }
            }));
        } 
        else {
            setNewUser((prevValue) => ({
                ...prevValue,
                [name]: value
            }));
        }
    }

    const addNewUser = () => {
        if(!newUser.firstname || !newUser.lastname || !newUser.username || !newUser.email) {
            alert('Please fill all the required fields');
            return;
        } 
        else {
            const userID = users.length + 1;
            console.log('User ID:', userID);
            setUsers([
                ...users,
                { ...newUser, id: userID }
            ]);
            alert('New user added successfully.');

            setNewUser(
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

        console.log('New User:', newUser);
    }

    const handleRowDelete = (userId) => {
        const updateUser = users.filter((user) => user.id !== userId);
        setUsers(updateUser);
        console.log('Deleted:', userId, updateUser);
    }

    return (
        <StyledDiv>
            <div>
                <StyledPara>Add And Delete Functions</StyledPara>
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h3>Add New User</h3>
                <StyledField>
                    <legend>First Name</legend>
                    <StyledInput 
                        type='text' 
                        name='firstname' 
                        value={newUser.firstname} 
                        onChange={handleInputChange} />
                </StyledField>
                <StyledField>
                    <legend>Last Name</legend>
                    <StyledInput 
                        type='text' 
                        name='lastname' 
                        value={newUser.lastname} 
                        onChange={handleInputChange} />
                </StyledField>
                <StyledField>
                    <legend>Username</legend>
                    <StyledInput 
                        type='text' 
                        name='username' 
                        value={newUser.username} 
                        onChange={handleInputChange} />
                </StyledField>
                <StyledField>
                    <legend>Email</legend>
                    <StyledInput 
                        type='email' 
                        name='email' 
                        value={newUser.email} 
                        onChange={handleInputChange} />
                </StyledField>
                <StyledField>
                    <legend>Street</legend>
                    <StyledInput 
                        type='text' 
                        name='address.street' 
                        value={newUser.address.street} 
                        onChange={handleInputChange} />
                </StyledField>
                <StyledField>
                    <legend>Suite</legend>
                    <StyledInput 
                        type='text' 
                        name='address.suite' 
                        value={newUser.address.suite} 
                        onChange={handleInputChange} />
                </StyledField>
                <StyledField>
                    <legend>City</legend>
                    <StyledInput 
                        type='text' 
                        name='address.city' 
                        value={newUser.address.city} 
                        onChange={handleInputChange} />
                </StyledField>
                <StyledField>
                    <legend>ZipCode</legend>
                    <StyledInput 
                        type='text' 
                        name='address.zipcode' 
                        value={newUser.address.zipcode} 
                        onChange={handleInputChange} />
                </StyledField>
                <div style={{ display: 'flex', margin: '14px' }}>
                    <StyledButton 
                        type='addnew' 
                        onClick={addNewUser}>
                        Add New
                    </StyledButton>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {usersTitle.map((user) => {
                                return(
                                    <TableHeaderCell key={user.id}>
                                        {user.title}
                                    </TableHeaderCell>
                                )
                            })}
                        </TableRow>
                    </TableHeader>
                    <tbody>
                        {users.map((user, index) => {
                            const { street, suite, city, zipcode } = user.address;
                            return(
                                <TableRow key={index}>
                                    <TableCell>{`${user.firstname} ${user.lastname}`}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <span style={{ color: '#504c4c',fontSize: '11px' }}>Street: {street}</span>
                                        <br />
                                        <span style={{ color: '#504c4c', fontSize: '11px' }}>Suite: {suite}</span>
                                        <br />
                                        <span style={{ color: '#504c4c', fontSize: '11px' }}>City: {city}</span>
                                        <br />
                                        <span style={{ color: '#504c4c', fontSize: '11px' }}>ZipCode: {zipcode}</span>
                                    </TableCell>
                                    <TableCell>
                                        <StyledButton 
                                            onClick={() => handleRowDelete(user.id)}>
                                            Delete
                                        </StyledButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </StyledDiv>
    )
}

export default AddAndDeleteComponent