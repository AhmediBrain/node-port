import React, { useState } from 'react'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
import { profileInformation } from '../../json-data/formsData';
import axios from 'axios';

const ProfileInformation = ({ userData, setUserData, userID }) => {
    const [editField, setEditField] = useState(null);
    const [tempValue, setTempValue] = useState('');
    const [tempFile, setTempFile] = useState(null);

    const handleEditClick = (key, value) => {
        setEditField(key);
        setTempValue(value);
    }

    const handleInputChange = (e) => {
        setTempValue(e.target.value);
    }

    const handleFileChange = (e) => {
        setTempFile(e.target.files[0]);
    }

    const handleSave = (key) => {
        const updatedUserData = { ...userData, [key]: tempValue };
        const formData = new FormData();
        for (const [k, value] of Object.entries(updatedUserData)) {
            formData.append(k, value);
        }

        if (tempFile) {
            formData.append('user_img', tempFile);
        }

        setUserData(updatedUserData);

        axios.put(`http://localhost:8030/users/${userID}`, formData)
            .then(response => {
                console.log('Response User Data: >>>', response.data);
                setEditField(null);
            })
            .catch(error => {
                console.error('Error updating user data:', error);
            });
        alert('Update Successfully.');
    }

    return (
        <div className='profile_information'>
            {profileInformation.map(info => { 
                return(
                    <div key={info.id}>
                        <p>
                            <strong>{info.title} </strong>
                            {editField === info.key ? (
                                info.key === 'user_img' ? (
                                    <input 
                                        type='file' 
                                        onChange={handleFileChange} />
                                ) : (
                                    <input 
                                        type='text' 
                                        value={tempValue} 
                                        onChange={handleInputChange} 
                                        onClick={() => handleSave(info.key)} 
                                        autoFocus />
                                )
                            ) : (
                                <span>{userData[info.key]}</span>
                            )}
                        </p>
                        <span>
                            <DriveFileRenameOutlineOutlinedIcon 
                                titleAccess='Edit' 
                                sx={{ fontSize: '14px', color: '#E29505', cursor: 'pointer' }} 
                                onClick={() => handleEditClick(info.key, userData[info.key])} />
                            <BeenhereOutlinedIcon 
                                titleAccess='Update'
                                sx={{ fontSize: '14px', color: '#7ebd30', cursor: 'pointer', marginLeft: '10px' }} 
                                onClick={() => handleSave(info.key)} />
                        </span>
                    </div>
                )
            })}
        </div>
    )
}

export default ProfileInformation