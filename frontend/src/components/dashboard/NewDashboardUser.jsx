import React, { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardNavbar from './DashboardNavbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import axios from 'axios';

const NewDashboardUser = ({ inputs, title }) => {
    const [file, setFile] = useState(null);
    const [addNew, setAddNew] = useState(
        {
            username: '',
            firstname: '',
            lastname: '',
            useremail: '',
            userphone: '',
            password: '',
            address: '',
            state: '',
            country: ''
        }
    );

    const [errors, setErrors] = useState({});

    const handleInfoChange = (e) => {
        const { name, value } = e.target;

        setAddNew((prevValue) => ({
            ...prevValue,
            [name]: value
        }));

        setErrors((prevError) => ({
            ...prevError,
            [name]: ''
        }));
    }

    const formValidation = () => {
        const { username, firstname, lastname, useremail, password } = addNew;

        const newErrors = {};

        if(!file) {
            newErrors.file = 'Image is required.';
        }

        if(username === '') {
            newErrors.username = 'Username is required.';
        } 
        else if(username.length < 4) {
            newErrors.username = 'Username needs at least 4 characters.';
        }

        if(firstname === '') {
            newErrors.firstname = 'First name is required.';
        }

        if(lastname === '') {
            newErrors.lastname = 'Last name is required.';
        }

        if(useremail === '') {
            newErrors.useremail = 'User email is required.';
        } 
        else {
            const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            if(!emailPattern.test(useremail)) {
                newErrors.useremail = 'Please enter a valid email address.';
            }
        }

        if(password === '') {
            newErrors.password = 'Password is required.';
        } 
        else if(password.length < 4) {
            newErrors.password = 'Password needs at least 4 characters.';
        }

        return newErrors;
    }

    const handleAddNewUser = async (e) => {
        e.preventDefault();

        const errorValidation = formValidation();

        if(Object.keys(errorValidation).length > 0) {
            setErrors(errorValidation);
            console.log('Errors:', errorValidation);
            return;
        }

        setErrors({});

        try {
            const formData = new FormData();

            formData.append('user_img', file);
            formData.append('user_name', addNew.username);
            formData.append('user_email', addNew.useremail);
            formData.append('user_phone', addNew.userphone);
            formData.append('password', addNew.password);
            formData.append('firstname', addNew.firstname);
            formData.append('lastname', addNew.lastname);
            formData.append('address', addNew.address);
            formData.append('state', addNew.state);
            formData.append('country', addNew.country);

            await axios.post('http://localhost:8030/users/add-user', formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            });

        } catch(error) {
            console.error('Error:', error);
        }

        setAddNew(
            {
                username: '',
                firstname: '',
                lastname: '',
                useremail: '',
                userphone: '',
                password: '',
                address: '',
                state: '',
                country: ''
            }
        );

        setFile(null);

        alert('New user added successfully.');
    }

    return (
        <div className='new_user'>
            <DashboardSidebar />
            <div className='user_container'>
                <DashboardNavbar />
                <div className='new_user_top'>
                    <p>{title}</p>
                </div>

                <form onSubmit={handleAddNewUser}>
                    <div className='new_user_bottom'>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <img className='file_img' 
                                src={file ? URL.createObjectURL(file) : 'https://us.123rf.com/450wm/urfandadashov/urfandadashov1806/urfandadashov180601827/150417827-photo-not-available-vector-icon-isolated-on-transparent-background-photo-not-available-logo-concept.jpg?ver=6'} 
                                alt='' />
                            <label htmlFor='file'>
                                <span style={{ color: '#C42B1C' }}>*</span> <DriveFolderUploadOutlinedIcon sx={{ color: '#6439FF', fontSize: '20px', cursor: 'pointer' }} titleAccess='Choose File' />
                            </label>
                            <input 
                                type='file' 
                                id='file' 
                                onChange={(e) => setFile(e.target.files[0])} 
                                style={{ display: 'none' }} />
                            {errors.file && <span className='required_msg'>{errors.file}</span>}
                        </div>
                        <div>
                            {inputs.map((user, index) => {
                                return (
                                    <fieldset key={index} 
                                        style={{ width: '100%', textAlign: 'left', marginBottom: '8px' }}>
                                        <legend 
                                            style={{ fontSize: '13px', color: '#6439FF' }}>
                                            {user.required === 1 ? (
                                                <><span style={{ color: '#C42B1C' }}>*</span>{user.label}</>
                                            ) : (
                                                <>{user.label}</>
                                            )}
                                        </legend>
                                        <input 
                                            className='info_input' 
                                            id={user.id} 
                                            type={user.type} 
                                            name={user.name} 
                                            placeholder={user.placeholder} 
                                            value={addNew[user.name]} 
                                            onChange={handleInfoChange} 
                                            autoComplete='off' />
                                        {errors[user.name] && <span className='required_msg'>{errors[user.name]}</span>}
                                    </fieldset>
                                )
                            })}
                            <div style={{ margin: '16px 0px 0px 16px' }}>
                                <button 
                                    type='submit' 
                                    className='form_btn'>
                                    Add User
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewDashboardUser