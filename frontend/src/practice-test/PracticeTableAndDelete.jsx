import React, { useState } from 'react'
import { StyledButton, StyledDiv, StyledField, StyledInput, StyledPara, Table, TableHeader, TableHeaderCell, TableRow } from './StyledComponent'
import { TableCell } from '@mui/material';
import { initialUsersData, usersTitle } from './practiceData';

const PracticeTableAndDelete = () => {
    const [users, setUsers] = useState(initialUsersData);

    const [newUser, setNewUser] = useState(
        {
            name: '',
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

    const handleRowDelete = (userId) => {
        const updateUser = users.filter((user) => user.id !== userId);
        setUsers(updateUser);
        console.log('Deleted:', userId, updateUser);
    }

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
        setNewUser((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
        console.log(`Name: ${name}, Value: ${value}`);
    }

    const AddNewUser = () => {
        if(newUser.name && newUser.username && newUser.email) {
            const userId = users.length + 1;
            setUsers((prevUsers) => [
                ...prevUsers,
                { ...newUser, id: userId }
            ]);

            alert('New User added successfully.');
        }

        setNewUser(
            {
                name: '',
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
        console.log('New User:', newUser);
    }
    
    return (
        <StyledDiv>
            <div>
                <StyledPara>Practice Table And Delete Function</StyledPara>
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h3>Add New User</h3>
                <StyledField>
                    <legend>Name</legend>
                    <StyledInput 
                        type='text' 
                        name='name' 
                        value={newUser.name} 
                        onChange={handleInputChange} />
                </StyledField>
                <StyledField>
                    <legend>User Name</legend>
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
                    <StyledButton variant='addnew'  
                        onClick={AddNewUser}>
                        Add User
                    </StyledButton>
                </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {usersTitle.map((item) => {
                                return(
                                    <TableHeaderCell key={item.id}>
                                        {item.title}
                                    </TableHeaderCell>
                                )
                            })}
                        </TableRow>
                    </TableHeader>

                    <tbody>
                        {users.map((user, index) => {
                            const { street, suite, city, zipcode } = user.address;
                            // console.log('User:', user);
                            return(
                                <TableRow key={index}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <span style={{ fontSize: '11px' }}>Street: {street}</span>
                                        <br />
                                        <span style={{ fontSize: '11px' }}>Suite: {suite}</span>
                                        <br />
                                        <span style={{ fontSize: '11px' }}>City: {city}</span>
                                        <br />
                                        <span style={{ fontSize: '11px' }}>ZipCode: {zipcode}</span>
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

export default PracticeTableAndDelete