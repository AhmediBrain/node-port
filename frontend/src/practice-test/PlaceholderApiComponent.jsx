import React, { useEffect, useState } from 'react';
import { placeholderTitle } from './practiceData';

const PlaceholderApiComponent = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((result) => {
                setUsers(result);
                setFilteredUsers(result);
            });
    }, []);

    const handleDeleteRow = (id) => {
        const updatedRow = users.filter((user) => user.id !== id);
        setUsers(updatedRow);
        setFilteredUsers(filteredUsers.filter((user) => user.id !== id));
    };

    const handleSearchChange = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = filteredUsers.filter(
            (user) =>
                user.name.toLowerCase().includes(value) ||
                user.username.toLowerCase().includes(value) ||
                user.email.toLowerCase().includes(value)
        );
        setUsers(filtered);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setUsers(filteredUsers);
    };

    return (
        <div>
            <h5>API Function Component</h5>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    overflowX: 'auto',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        margin: '0 10px 10px 0',
                        gap: '0.5%',
                    }}
                >
                    <input
                        type="text"
                        placeholder="Search ..."
                        style={{ padding: '3px 5px' }}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button onClick={clearSearch}>Clear</button>
                </div>
                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            {placeholderTitle.map((user) => (
                                <th key={user.id} style={{ padding: '3px 5px' }}>
                                    {user.title}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => {
                            const { street, suite, city, zipcode } = user.address;

                            return (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.website}</td>
                                    <td>
                                        <span style={{ fontSize: '10px' }}>
                                            <span style={{ fontWeight: 'bold' }}>Street: </span>
                                            {street}
                                        </span>
                                        <br />
                                        <span style={{ fontSize: '10px' }}>
                                            <span style={{ fontWeight: 'bold' }}>Suite: </span>
                                            {suite}
                                        </span>
                                        <br />
                                        <span style={{ fontSize: '10px' }}>
                                            <span style={{ fontWeight: 'bold' }}>City: </span>
                                            {city}
                                        </span>
                                        <br />
                                        <span style={{ fontSize: '10px' }}>
                                            <span style={{ fontWeight: 'bold' }}>Zip Code: </span>
                                            {zipcode}
                                        </span>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteRow(user.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlaceholderApiComponent;