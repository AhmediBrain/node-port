import React, { useEffect, useState } from 'react'
import axios from 'axios'

const PracticeNode = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8030/users')
        .then((res) => {
            setData(res.data);
            console.log('User Data:', res.data);
        })
    }, []);
    return (
        <div className='container'>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>User Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user, index) => {
                        console.log('User#:', user)
                        return(
                            <tr key={index}>
                                <td>{user.user_id}</td>
                                <td>{user.user_name}</td>
                                <td>{user.user_email}</td>
                                <td>{user.user_phone}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default PracticeNode