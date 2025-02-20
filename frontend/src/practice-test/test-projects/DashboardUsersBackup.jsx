import React, { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardNavbar from './DashboardNavbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import axios from 'axios';

const NewDashboardUser = ({ inputs, title }) => {
    const [file, setFile] = useState(null);
    const [profileData, setProfileData] = useState({
        userName: '',
        userEmail: '',
        userPhone: '',
        userPassword: '',
        firstName: '',
        lastName: '',
        userAddress: '',
        userState: '',
        userCountry: ''
    });

    const [errors, setErrors] = useState({});

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevState => ({
            ...prevState,
            [name]: value
        }));    
    }

    const formValidation = () => {
        const { userName, userEmail, userPassword, firstName, lastName } = profileData;
        const newErrors = {};

        if(!file) {
            newErrors.file = 'Image is required.';
        }

        if(userName === '') {
            newErrors.userName = 'Username is required.';
        }
        else if(userName.length < 4) {
            newErrors.userName = 'Username needs at least 4 characters.';
        }
        if(userEmail === '') {
            newErrors.userEmail = 'User Email is required.';
        } 
        else {
            const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            if(!emailPattern.test(userEmail)) {
                newErrors.userEmail = 'Please enter a valid email address.';
            }
        }
        if(userPassword === '') {
            newErrors.userPassword = 'Password is required.';
        }
        else if(userPassword.length < 4) {
            newErrors.userPassword = 'Password needs at least 4 characters.';
        }
        if(firstName === '') {
            newErrors.firstName = 'First Name is required.';
        }
        if(lastName === '') {
            newErrors.lastName = 'Last Name is required';
        }

        return newErrors;
    }

    const addNewUser = async (e) => {
        e.preventDefault();
        
        const errorValidation = formValidation();
        if(Object.keys(errorValidation).length > 0) {
            setErrors(errorValidation);
            return;
        }

        setErrors({});

        try {
            const formData = new FormData();
            formData.append('user_img', file);
            formData.append('user_name', profileData.userName);
            formData.append('user_email', profileData.userEmail);
            formData.append('user_phone', profileData.userPhone);
            formData.append('password', profileData.userPassword);
            formData.append('firstname', profileData.firstName);
            formData.append('lastname', profileData.lastName);
            formData.append('address', profileData.userAddress);
            formData.append('state', profileData.userState);
            formData.append('country', profileData.userCountry);

            const response = await axios.post('http://localhost:8030/users/add-user', formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            });

            console.log('Response:', response);

            setProfileData({
                user_name: '',
                user_email: '',
                user_phone: '',
                password: '',
                firstname: '',
                lastname: '',
                address: '',
                state: '',
                country: '',
            });
            setFile(null);

            alert('New User Added Successfully.');
        } catch(error) {
            console.log('Error:', error);
        }
    }

    return (
        <div className='new_user'>
            <DashboardSidebar />
            <div className='user_container'>
                <DashboardNavbar />
                <div className='new_user_top'>
                    <div style={{ display: 'flex', flexDirection: 'column', margin: '0px' }}>
                        <p>{title}</p>
                        <p className='required_field'>"<span>*</span>" indicates required fields</p>
                    </div>
                </div>
                <div className='new_user_bottom'>
                    <div className='user_bottom_left'>
                        <img src={file ? URL.createObjectURL(file) : 'https://us.123rf.com/450wm/urfandadashov/urfandadashov1806/urfandadashov180601827/150417827-photo-not-available-vector-icon-isolated-on-transparent-background-photo-not-available-logo-concept.jpg?ver=6'} alt='' />
                    </div>
                    <div className='user_bottom_right'>
                        <form onSubmit={addNewUser}>
                            <div className='form_input'>
                                <label htmlFor='file'>
                                    <span style={{ color: '#C42B1C' }}>*</span>Image: <DriveFolderUploadOutlinedIcon sx={{ cursor: 'pointer' }} />
                                    {errors.file && <span className='required_msg'>{errors.file}</span>}
                                </label>
                                <input 
                                    type='file' 
                                    id='file' 
                                    onChange={(e) => setFile(e.target.files[0])} 
                                    style={{ display: 'none' }} />
                            </div>
                            {inputs.map((item, index) => {
                                return(
                                    <div className='form_input' key={index}>
                                        <label>
                                            {item.required === 1 ? (
                                                <><span style={{ color: '#C42B1C' }}>*</span>{item.label}</>
                                            ) : (
                                                <>{item.label}</>
                                            )}
                                        </label>
                                        <input 
                                            id={item.id} 
                                            type={item.type} 
                                            name={item.name}
                                            placeholder={item.placeholder} 
                                            value={profileData[item.name] || ''} 
                                            onChange={handleProfileChange} 
                                            autoComplete='off' />
                                        {errors[item.name] && <span className='required_msg'>{errors[item.name]}</span>}
                                    </div>
                                )
                            })}

                            <button 
                                disabled='' 
                                className='form_btn' 
                                type='submit'>
                                Add User
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewDashboardUser

// const handleAddNewUser = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     const formData = new FormData();
//     Object.keys(addProfile).forEach((key) => {
//         formData.append(key, addProfile[key]);
//     });

//     if (file) {
//         formData.append('user_img', file);
//     }

//     try {
//         const response = await fetch('http://your-backend-url/api/addUser', {
//             method: 'POST',
//             body: formData
//         });

//         const data = await response.json();

//         if (response.ok) {
//             setMessage('User added successfully!');
//             setAddProfile({
//                 username: '',
//                 useremail: '',
//                 userphone: '',
//                 password: '',
//                 firstname: '',
//                 lastname: '',
//                 address: '',
//                 state: '',
//                 country: ''
//             });
//             setFile(null);
//         } else {
//             setMessage(data.message || 'Failed to add user.');
//         }
//     } catch (error) {
//         setMessage('An error occurred while adding the user.');
//         console.error('Error:', error);
//     } finally {
//         setLoading(false);
//     }
// };