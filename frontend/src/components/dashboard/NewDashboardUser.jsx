import React, { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardNavbar from './DashboardNavbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';

// http://localhost:8090/phpmyadmin/index.php?route=/sql&pos=0&db=node_sample&table=users

const NewDashboardUser = ({ inputs, title }) => {
    const [file, setFile] = useState(null);
    const [addProfile, setAddProfile] = useState(
        {
            username: '',
            useremail: '',
            userphone: '',
            password: '',
            firstname: '',
            lastname: '',
            address: '',
            state: '',
            country: ''
        }
    );

    const [errors, setErrors] = useState({});

    const handleInfoChange = (e) => {
        const { name, value } = e.target;

        setAddProfile((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
    }

    const formValidation = () => {
        const { username, useremail, password, firstname, lastname } = addProfile;
        const newErrors = {}

        if(!file) {
            newErrors.file = 'Image is required.';
        }

        if(username === '') {
            newErrors.username = 'Username is required';
        } 
        else if(username.length < 4) {
            newErrors.username = 'Username needs at least 4 characters.'
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
    }

    const handleAddNewUser = async (e) => {
        e.preventDefault();
    }

    return (
        <div className='new_user'>
            <DashboardSidebar />
            <div className='user_container'>
                <DashboardNavbar />
                <div className='new_user_top'>
                    <div style={{ display: 'flex', flexDirection: 'column', margin: '0px' }}>
                        <p>{title}</p>
                        <p className='required_field'><span>"*"</span> Indicates required fields.</p>
                    </div>
                </div>
                <div className='new_user_bottom'>
                    <div className='user_bottom_left'>
                        <img src={file ? URL.createObjectURL(file) : 'https://us.123rf.com/450wm/urfandadashov/urfandadashov1806/urfandadashov180601827/150417827-photo-not-available-vector-icon-isolated-on-transparent-background-photo-not-available-logo-concept.jpg?ver=6'} alt='' />
                    </div>
                    <div className='user_bottom_right'>
                        <form onSubmit={handleAddNewUser}>
                            <div className='form_input'>
                                <label htmlFor='file' 
                                    style={{ fontSize: '13px', color: '#6439FF', marginLeft: '16px' }}>
                                    <span style={{ color: '#C42B1C' }}>*</span>Image: <DriveFolderUploadOutlinedIcon sx={{ cursor: 'pointer', fontSize: '18px' }} titleAccess='Choose file' />
                                </label>
                                <input 
                                    type='file' 
                                    id='file' 
                                    onChange={(e) => setFile(e.target.files[0])} 
                                    style={{ display: 'none' }} />
                            </div>
                            {inputs.map((item, index) => {
                                return (
                                    <div className='form_input' key={index} 
                                        style={{ marginBottom: '4px' }}>
                                        <fieldset style={{ textAlign: 'left', border: 'none' }}>
                                            <legend style={{ fontSize: '13px', color: '#6439FF' }}>
                                                {item.required === 1 ? (
                                                    <><span style={{ color: '#C42B1C' }}>*</span> {item.label}</>
                                                ) : (
                                                    <>{item.label}</>
                                                )}
                                            </legend>
                                            <input 
                                                id={item.id} 
                                                type={item.type} 
                                                name={item.name} 
                                                placeholder={item.placeholder} 
                                                value={addProfile[item.name] || ''} 
                                                onChange={handleInfoChange} 
                                                autoComplete='off' />
                                        </fieldset>
                                    </div>
                                )
                            })}
                            <div style={{ display: 'flex', marginLeft: '10%' }}>
                                <button 
                                    disabled='' 
                                    className='form_btn'>
                                    Add User
                                </button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewDashboardUser