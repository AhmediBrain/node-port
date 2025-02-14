import React, { useEffect, useState } from 'react'
import { apiTitle, jsonData } from './practiceData';

const PlaceholderApiComponent = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((result) => {
            setUsers(result);
            console.log('Result:', result);
        })
    }, []);

    const handleSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchTerm(searchValue);
        console.log('Search Value:', searchValue);
    }

    return (
        <div>
            <h5>API Add and Save Functions</h5>
            <div>
                <div>
                    <h5>User's Information</h5>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1%', margin: '0 10px 10px 0' }}>
                    <input 
                        type='text' 
                        style={{ padding: '3px 5px' }} 
                        placeholder='Search ...' 
                        value={searchTerm} 
                        onChange={handleSearchChange} />
                    <button>
                        Reset
                    </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                {apiTitle.map((user) => {
                                    return (
                                        <th key={user.id}>{user.title}</th>
                                    )
                                })}
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => {
                                console.log('User:', user);
                                return (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
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

export default PlaceholderApiComponent