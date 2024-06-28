import React, { useState } from 'react'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import { NavLink } from 'react-router-dom'
import axios from 'axios';

const DashboardLogin = () => {
    const [loginForm, setLoginForm] = useState({
        userLogin: '',
        userPassword: ''
    });

    const [errors, setErrors] = useState({});

    const [loginStatus, setLoginStatus] = useState('');

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginForm(prevState => ({
            ...prevState, 
            [name]: value
        }));
        console.log('User:', loginForm);
    }

    const formValidation = () => {
        const { userLogin, userPassword } = loginForm;

        const newErrors = {};

        if(userLogin === '') {
            newErrors.userLogin = 'Please enter your username.';
        }
        if(userPassword === '') {
            newErrors.userPassword = 'Please enter password.';
        }

        return newErrors;
    }

    const userLoginForm = async (e) => {
        e.preventDefault();

        const errorValidation = formValidation();
        console.log('Validation:', errorValidation);
        if(Object.keys(errorValidation).length > 0) {
            setErrors(errorValidation);
            return;
        }

        setErrors({});

        try {
            const response = await axios.post("http://localhost:8030/users/login", {
                user_name: loginForm.userLogin,
                password: loginForm.userPassword
            });
            console.log('Users Data:', response.data);

            alert('Successfully Logged In.');
            setLoginStatus('Successfully Logged In.')
        } catch(error) {
            if(error.response) {
                if(error.response.status === 401) {
                    alert('Password does not match with username.');
                    setLoginStatus('Password does not match with username.');
                } 
                else if(error.response.status === 404) {
                    alert('User not found.');
                    setLoginStatus('User not found.');
                } 
                else {
                    setErrors({ general: 'An error occurred.' });
                    setLoginStatus('An error occurred.');
                }
            } 
            else {
                setErrors({ general: 'An error occurred.' });
                setLoginStatus('An error occurred.');
            }
        }
    }
    
    return (
        <div className='login_container'>
            <div className='login_wrapper'>
                <form onSubmit={userLoginForm}>
                    <p>Login</p>
                    <div className='login_input_box'>
                        <input 
                            type='text' 
                            placeholder='Username' 
                            name='userLogin' 
                            value={loginForm.userLogin}
                            onChange={handleLoginChange} 
                            autoComplete='off' />
                        <PermIdentityOutlinedIcon 
                            sx={{fontSize: '25px'}}
                            className='icon_styles' />
                        {errors.userLogin && <span>{errors.userLogin}</span>}
                    </div>
                    <div className='login_input_box'>
                        <input 
                            type='password' 
                            placeholder='Password' 
                            name='userPassword' 
                            value={loginForm.userPassword} 
                            onChange={handleLoginChange} 
                            autoComplete='off' />
                        <PasswordOutlinedIcon 
                            sx={{fontSize: '25px'}}
                            className='icon_styles' />
                    </div>
                    <div className='remember_forgot'>
                        <label>
                            <input type='checkbox' />
                            Remember Me
                        </label>
                        <a href='#'>Forgot password?</a>
                    </div>
                    <button 
                        type='submit' 
                        className='submit_btn'>
                        Login
                    </button>
                    <div className='register_link'>
                        <span>
                            Don't have an account? <NavLink to='/register'>Register</NavLink>
                        </span>
                    </div>
                </form>
                <p>{loginStatus}</p>
            </div>
        </div>
    )
}

export default DashboardLogin