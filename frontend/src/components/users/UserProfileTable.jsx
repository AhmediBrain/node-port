import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import PhonePausedOutlinedIcon from '@mui/icons-material/PhonePausedOutlined';
import ProfileInformation from './ProfileInformation';
import CircularProgress from '@mui/material/CircularProgress';

const UserProfileTable = () => {
    const { userID } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8030/users/${userID}`)
        .then(response => {
            setUserData(response.data.data);
            console.log('User Data:', response.data.data);
            setLoading(false);
        })
        .catch(error => {
            setError('Error fetching user data:' + error.message);
            setLoading(false);
        })
    }, [userID]);

    if(loading) {
        return <span>Loading</span>;
    }

    if(error) {
        return <span>{error}</span>
    }

    return (
        <div className='userprofile_container'>
            <div className='userprofile_left'>
                {userData ? (
                        <div>
                            <div>
                                {userData.user_img ? (
                                    <img src={`http://localhost:8030/${userData.user_img}`} 
                                        alt={userData.user_name} 
                                        width='100' />
                                ) : (
                                    <span>No Image</span>
                                )}
                            </div>
                            <div className='profile_summary'>
                                <PersonOutlineOutlinedIcon 
                                    sx={{ fontSize: '14px', color: '#556080' }} />
                                <span>{userData.user_name}</span>
                            </div>
                            <div className='profile_summary'>
                                <MarkEmailReadOutlinedIcon 
                                    sx={{ fontSize: '14px', color: '#556080' }} />
                                <span>{userData.user_email}</span>
                            </div>
                            <div className='profile_summary'>
                                <PhonePausedOutlinedIcon 
                                    sx={{ fontSize: '14px', color: '#556080' }} />
                                <span>{userData.user_phone}</span>
                            </div>
                        </div>
                    ) : (
                        <span>
                            <CircularProgress />
                        </span>
                    )
                }
            </div>            
            <div className='userprofile_right'>
                <p>INFORMATION</p>
                {userData && (
                    <ProfileInformation userData={userData} userID={userID} setUserData={setUserData} />
                )}
            </div>
        </div>
    )
}

export default UserProfileTable