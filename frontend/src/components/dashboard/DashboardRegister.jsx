import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const DashboardRegister = () => {
    const [formData, setFormData] = useState({
        userRegister: '',
        userEmail: '',
        userPhone: '',
        passRegister: ''
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const validateForm = () => {
        const { userRegister, userEmail, passRegister } = formData;
        const newErrors = {};

        if(userRegister === '') {
            newErrors.userRegister = 'Username is required.';
        }
        if(userRegister.length < 4) {
            newErrors.userRegister = 'Username needs at least 4 characters.';
        }
        if(userEmail === '') {
            newErrors.userEmail = 'User Email is required.';
        } 
        else {
            const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(!emailPattern.test(userEmail)) {
                newErrors.userEmail = 'Please enter a valid email address.';
            }
        }
        if(passRegister === '') {
            newErrors.passRegister = 'Password is required.'
        }
        if(passRegister.length < 4) {
            newErrors.passRegister = 'Password needs at least 4 characters.';
        }

        return newErrors;
    }

    const register = async (e) => {
        e.preventDefault();

        const errorValidation = validateForm();
        if(Object.keys(errorValidation).length > 0) {
            setErrors(errorValidation);
            return;
        }

        setErrors({});

        try {
            const response = await axios.post("http://localhost:8030/users/register", {
                user_name: formData.userRegister,
                user_email: formData.userEmail,
                user_phone: formData.userPhone,
                password: formData.passRegister
            });
            console.log('Response Data:', response);
            setFormData({
                userRegister: '',
                userEmail: '',
                userPhone: '',
                passRegister: ''
            });

            alert('Registration Successfully Submitted.');
            navigate('/login');
        } catch(error) {
            console.log('An error occurred while registering the user!', error);
        }
    }

    return (
        <div className='login_container'>
            <div className='login_wrapper'>
                <form onSubmit={register}>
                    <p>Register</p>
                    <p className='required_field'>"<span>*</span>" indicates required fields</p>
                    <div className='login_input_box'>
                        <input 
                            type='text' 
                            name='userRegister' 
                            value={formData.userRegister}
                            placeholder='* Username'
                            onChange={handleFormChange} 
                            autoComplete="off" />
                        {errors.userRegister && <span>{errors.userRegister}</span>}
                    </div>
                    <div className='login_input_box'>
                        <input 
                            type='text' 
                            name='userEmail' 
                            value={formData.userEmail}
                            placeholder='* Email' 
                            onChange={handleFormChange} 
                            autoComplete="off" />
                        {errors.userEmail && <span>{errors.userEmail}</span>}
                    </div>
                    <div className='login_input_box'>
                        <input 
                            type='password' 
                            name='passRegister' 
                            value={formData.passRegister}
                            placeholder='* Password' 
                            onChange={handleFormChange} 
                            autoComplete="off" />
                        {errors.passRegister && <span>{errors.passRegister}</span>}
                    </div>
                    <div className='login_input_box'>
                        <input 
                            type="tel" 
                            name='userPhone' 
                            value={formData.userPhone}
                            placeholder='Phone (Optional)' 
                            onChange={handleFormChange} 
                            autoComplete="off" />
                    </div>
                    <div>
                        <button 
                            className='submit_btn'
                            type='submit'>
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DashboardRegister