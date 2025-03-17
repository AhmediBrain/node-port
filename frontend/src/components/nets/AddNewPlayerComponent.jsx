import React, { useState } from 'react';
import DashboardSidebar from '../dashboard/DashboardSidebar';
import DashboardNavbar from '../dashboard/DashboardNavbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import axios from 'axios';

const AddNewPlayerComponent = ({ inputs, title }) => {
    const [file, setFile] = useState(null);
    const [addPlayer, setAddPlayer] = useState(
        {
            pid: '',
            firstname: '',
            lastname: '',
            pos: '',
            ast: '',
            blk: '',
            min: '',
            pts: '',
            stl: '',
            tov: ''
        }
    );

    const [errors, setErrors] = useState({});

    const handleInfoChange = (e) => {
        const { name, value } = e.target;

        setAddPlayer((prevValue) => ({
            ...prevValue,
            [name]: value
        }));

        console.log(`Name: ${name}, Value: ${value}`);
    }

    const formValidation = () => {
        const { pid, firstname, lastname, pos, ast, blk, min, pts } = addPlayer;

        const newErrors = {};

        if(!file) {
            newErrors.file = 'Player image is required.';
        }

        if(pid === '') {
            newErrors.pid = 'Player ID is required.';
        }

        if(firstname === '') {
            newErrors.firstname = 'First name is required.';
        }

        if(lastname === '') {
            newErrors.lastname = 'Last name is required.';
        }

        if(pos === '') {
            newErrors.pos = 'Position is required.';
        }

        if(ast === '') {
            newErrors.ast = 'Assits is required.';
        }

        if(blk === '') {
            newErrors.blk = 'Blocks is required.';
        }

        if(min === '') {
            newErrors.min = 'Minutes is required.';
        }

        if(pts === '') {
            newErrors.pts = 'Points is required.';
        }
        
        console.log('New Errors: ', newErrors);
        return newErrors;
    }

    const handleAddPlayer = async (e) => {
        e.preventDefault();

        const errorValidation = formValidation();
        if(Object.keys(errorValidation).length > 0) {
            setErrors(errorValidation);
            return;
        }

        setErrors({});

        try {
            const formData = new FormData();
            formData.append('player_img', file);
            formData.append('pid', addPlayer.pid);
            formData.append('firstname', addPlayer.firstname);
            formData.append('lastname', addPlayer.lastname);
            formData.append('position', addPlayer.pos);
            formData.append('assists', addPlayer.ast);
            formData.append('blocks', addPlayer.blk);
            formData.append('minutes', addPlayer.min);
            formData.append('points', addPlayer.pts);
            formData.append('steals', addPlayer.stl);
            formData.append('turnover', addPlayer.tov);

            await axios.post('http://localhost:8030/nets-team/add-player', formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            });

            alert('Nets new player added successfully.');

            // setFile(null);

            // setAddPlayer(
            //     {
            //         pid: '',
            //         firstname: '',
            //         lastname: '',
            //         pos: '',
            //         ast: '',
            //         blk: '',
            //         min: '',
            //         pts: '',
            //         stl: '',
            //         tov: ''
            //     }
            // );

        } catch(error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className='new_user'>
            <DashboardSidebar />
            <div className='user_container'>
                <DashboardNavbar />
                <div className='new_user_top'>
                    <p>{title}</p>
                </div>
                <form onSubmit={handleAddPlayer}>
                    <div className='new_user_bottom'>
                        <div>
                            <img className='file_img' 
                                src={file ? URL.createObjectURL(file) : 'https://us.123rf.com/450wm/urfandadashov/urfandadashov1806/urfandadashov180601827/150417827-photo-not-available-vector-icon-isolated-on-transparent-background-photo-not-available-logo-concept.jpg?ver=6'} 
                                alt='' />
                            <div>
                                <label htmlFor='file'>
                                    <span style={{ color: '#f11e0e' }}>*</span> <DriveFolderUploadOutlinedIcon sx={{ color: '#EF7B14', fontSize: '20px', cursor: 'pointer' }} titleAccess='Choose File' />
                                </label>
                                <input 
                                    type='file' 
                                    id='file' 
                                    onChange={(e) => setFile(e.target.files[0])} 
                                    style={{ display: 'none' }} />
                            </div>
                            {errors.file && <span className='required_msg'>{errors.file}</span>}
                        </div>

                        <div>
                            {inputs.map((user) => {
                                return (
                                    <fieldset key={user.id} 
                                        style={{ textAlign: 'left', marginBottom: '5px' }}>
                                        <legend style={{ fontSize: '13px', color: '#14829B' }}>
                                            {user.required === 1 ? (
                                                <><span style={{ color: '#f11e0e' }}>*</span>{user.label}</>
                                            ) : (
                                                <>{user.label}</>
                                            )}
                                        </legend>
                                        <input 
                                            type={user.type} 
                                            name={user.name} 
                                            placeholder={user.placeholder} 
                                            value={addPlayer[user.name]} 
                                            onChange={handleInfoChange} 
                                            className='info_input' />
                                    </fieldset>
                                )
                            })}
                            <div style={{ margin: '16px' }}>
                                <button 
                                    type='submit' 
                                    className='player_btn'>
                                    Add Player
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNewPlayerComponent