import React, { useEffect, useState } from 'react'
import { tableTitle } from '../../json-data/formsData'
import { Link, useNavigate } from 'react-router-dom'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import axios from 'axios';

const UsersAllTable = () => {
    const [usersData, setUsersData] = useState([]);
    const [editID, setEditID] = useState(null);
    const [userText, setUserText] = useState('');

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

    const handleUserTextChange = (e) => {
        setUserText(e.target.value);
    }

    const handleEditUser = (id, currentUser) => {
        setEditID(id);
        setUserText(currentUser);
    }

    const handleSaveUser = (id) => {
        axios.patch(`http://localhost:8030/users/${id}`, { user_name: userText })
            .then(response => {
                const updatedUsers = usersData.map(user =>
                    user.user_id === id ? { ...user, user_name: userText } : user
                );
                setUsersData(updatedUsers);
                setEditID(null);
                alert('User updated successfully!');
            })
            .catch(error => {
                console.error('Error updating user:', error);
                alert('Failed to update user.');
            });
        // const updatedValue = usersData.map(
        //     (user) => 
        //         user.id === id ? { ...user, user_name: userText } : user
        // );

        // setUsersData(updatedValue);
        // setEditID(null);
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
                                <td style={{ padding: '0 8px' }}>
                                    {editID === item.user_id ? (
                                        <input 
                                            type='text' 
                                            value={userText} 
                                            onChange={handleUserTextChange} 
                                            style={{ border: '1px solid #8172B9', outline: 'none', padding: '5px 8px' }} />
                                    ) : (
                                        <span style={{ fontSize: '14px' }}>{item.user_name}</span>
                                    )}
                                </td>
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
                                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <button 
                                            style={{ border: 'none', padding: '0px 3px', cursor: 'pointer' }}
                                            onClick={() => deleteUserRow(item.user_id)}>
                                            <HighlightOffOutlinedIcon 
                                                sx={{ color: '#CC0000' }} 
                                                titleAccess='Delete' />
                                        </button>
                                        {editID === item.user_id ? (
                                            <button 
                                                style={{ border: 'none', padding: '0px 3px', cursor: 'pointer' }} 
                                                onClick={() => handleSaveUser(item.user_id)}>
                                                <PostAddOutlinedIcon 
                                                    sx={{ color: '#27A243' }} 
                                                    titleAccess='Save' />
                                            </button>
                                        ) : (
                                            <button 
                                                style={{ border: 'none', padding: '0px 3px', cursor: 'pointer' }} 
                                                onClick={() => handleEditUser(item.user_id, item.user_name)}>
                                                <EditNoteOutlinedIcon 
                                                    sx={{ color: '#2632a0', fontSize: '30px' }} 
                                                    titleAccess='Edit' />
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
    )
}

export default UsersAllTable