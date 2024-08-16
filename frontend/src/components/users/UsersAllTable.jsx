import React, { useEffect, useState } from 'react'
import { tableTitle } from '../../json-data/formsData'
import { Link, useNavigate } from 'react-router-dom'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import axios from 'axios';

const UsersAllTable = () => {
    const [usersData, setUsersData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8030/users')
        .then(response => {
            setUsersData(response.data);
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.log('Error fetching data!', error);
        })
    }, []);

    const deleteUserRow = (userID) => {
        const isConfirmed = window.confirm('Are you sure you want to delete?');
        if(isConfirmed) {
            axios.delete(`http://localhost:8030/users/${userID}`)
            .then(response => {
                alert('User Deleted Successfully.');
                setUsersData(usersData.filter(user => user.user_id !== userID));
            })
            .catch(error => {
                console.log('Error Deleting User:', error);
            });
        }
    }

    const userProfileDetails = (userID) => {
        navigate(`/profile/${userID}`);
        console.log('User Profile:', userID);
    }

    return (
        <div className='users_table_container'>
            <div className='users_title'>
                <p>User's List</p>
                <Link to="/add-user" 
                    className='users_title_link'>
                    Add New User
                </Link>
            </div>
            <table>
                <thead>
                    <tr>
                        {tableTitle.map((item) => {
                            const titleStyle = item.title === 'Action' ? { fontSize: '12px' } : { fontSize: '16px' };
                            return(
                                <th key={item.id} 
                                    style={titleStyle}>
                                    {item.title}
                                </th>
                            )
                        })}
                    </tr>                
                </thead>
                <tbody>
                    {usersData.map((item, index) => {
                        return(
                            <tr key={index}>
                                <td>
                                    {item.user_img ? (
                                        <img src={`http://localhost:8030/${item.user_img}`} 
                                            alt={item.user_name} 
                                            width='50' 
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => userProfileDetails(item.user_id)} />
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                </td>
                                <td>{item.user_name}</td>
                                <td>{item.firstname}</td>
                                <td>{item.lastname}</td>
                                <td>{item.user_email}</td>
                                <td>{item.user_phone}</td>
                                <td>
                                    <span>{item.address}, </span>
                                    <span>{item.state}, </span>
                                    <span>{item.country}</span>
                                </td>
                                <td>
                                    <HighlightOffOutlinedIcon 
                                        sx={{ fontSize: '20px', color: '#CC0000', cursor: 'pointer' }} 
                                        onClick={() => deleteUserRow(item.user_id)} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default UsersAllTable