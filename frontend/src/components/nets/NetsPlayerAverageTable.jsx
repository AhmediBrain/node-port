import React, { useEffect, useState } from 'react'
import { netsAveTitle } from '../../json-data/formsData'
import axios from 'axios';
import { Link } from 'react-router-dom';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';

const NetsPlayerAverageTable = () => {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [netsSearch, setNetsSearch] = useState('');
    const [editID, setEditID] = useState(null);
    const [editPosition, setEditPosition] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8030/teams')
        .then((result) => {
            setTeams(result.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8030/teams/nets-team')
        .then((result) => {
            setPlayers(result.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }, []);

    const handleNetsSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setNetsSearch(searchValue);
    }

    const handleDeletePlayer = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete?');
        if(isConfirmed) {
            axios.delete(`http://localhost:8030/nets-team/${id}`)
            .then(response => {
                console.log('Response: ', response);
                alert('Player deleted successfully.');
                setPlayers(players.filter((user) => user.id !== id));
            })
            .catch(error => {
                console.error('Error deleting player.', error);
            })
        }
    }

    const handleSavePlayer = (id) => {}

    const handleEditPlayer = (id, currentPosition) => {
        setEditID(id);
        setEditPosition(currentPosition);
    }

    return (
        <div className='users_table_container'>
            <div className='users_title'>
                <p>Nets Players</p>
                <Link to='/add-player' 
                    className='users_title_link'>
                    Add New Player
                </Link>
            </div>
            <div style={{ border: '1px solid #aeb7be', padding: '5px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '2%', margin: '0 10px 10px 0' }}>
                    <input 
                        type='text' 
                        value={netsSearch} 
                        onChange={handleNetsSearchChange} 
                        style={{ border: '1px solid #b3a5e7', outline: 'none', padding: '5px 8px' }} />
                    <button 
                        style={{ border: '2px solid #f59d39', borderRadius: '5px', color: '#f59d39', fontWeight: 'bold', cursor: 'pointer' }}>
                        Reset
                    </button>
                </div>
                <div style={{ display: 'flex', textAlign: 'left', marginBottom: '10px' }}>
                    {teams.map((team) => {
                        return (
                            <div key={team.id} 
                                style={{ display: 'flex', flexDirection: 'column', }}>
                                <span style={{ fontSize: '13px', color: '#746c8f' }}>Team ID# <span style={{ fontWeight: 'bold' }}>{team.tid}</span></span>
                                <span style={{ fontSize: '13px', color: '#746c8f' }}>Abbreviation: <span style={{ fontWeight: 'bold' }}>{team.ta}</span></span>
                                <span style={{ fontSize: '13px', color: '#746c8f' }}>Team Name: <span style={{ fontWeight: 'bold' }}>{team.tn}</span></span>
                                <span style={{ fontSize: '13px', color: '#746c8f' }}>Team City: <span style={{ fontWeight: 'bold' }}>{team.tc}</span></span>
                            </div>
                        )
                    })}
                </div>
                <table>
                    <thead>
                        <tr>
                            {netsAveTitle.map((user) => {
                                const titleStyle = user.title === 'Action' ? { fontSize: '11px' } : { fontSize: '16px' }
                                return (
                                    <th key={user.id} 
                                        style={ titleStyle }>
                                        {user.title}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {players.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td>
                                        {user.player_img ? (
                                            <img src={`http://localhost:8030/${user.player_img}`} 
                                                alt='' 
                                                width='50' />
                                        ) : (
                                            <>No Image</>
                                        )}
                                    </td>
                                    <td>{user.pid}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>
                                        {editID === user.id ? (
                                            <input 
                                                type='text'
                                                value={editPosition} 
                                                onChange={(e) => setEditPosition(e.target.value)} 
                                                style={{ border: '1px solid #b3a5e7', outline: 'none', padding: '5px 8px' }} />
                                        ) : (
                                            <>{user.position}</>
                                        )}
                                    </td>
                                    <td>
                                        <span><span style={{ fontWeight: 'bold' }}>Assists: </span>{user.assists}</span>
                                        <br />
                                        <span><span style={{ fontWeight: 'bold' }}>Blocks: </span>{user.blocks}</span>
                                        <br />
                                        <span><span style={{ fontWeight: 'bold' }}>Points: </span>{user.points}</span>
                                        <br />
                                        <span><span style={{ fontWeight: 'bold' }}>Minutes: </span>{user.minutes}</span>
                                        <br />
                                        <span><span style={{ fontWeight: 'bold' }}>Steals: </span>{user.steals}</span>
                                        <br />
                                        <span><span style={{ fontWeight: 'bold' }}>Turn Over: </span>{user.turnover}</span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                            <button 
                                                style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                                onClick={() => handleDeletePlayer(user.id)}>
                                                <HighlightOffOutlinedIcon 
                                                    sx={{ color: '#C42B1C' }} 
                                                    titleAccess='Delete' />
                                            </button>
                                            {editID === user.id ? (
                                                <button 
                                                    style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                                    onClick={() => handleSavePlayer(user.id)}>
                                                    <SaveOutlinedIcon 
                                                        sx={{ color: '#289847' }} 
                                                        titleAccess='Save' />
                                                </button>
                                            ) : (
                                                <button 
                                                    style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                                    onClick={() => handleEditPlayer(user.id, user.position)}>
                                                    <AppRegistrationOutlinedIcon 
                                                        sx={{ color: '#0078B9' }} 
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
        </div>
    )
}

export default NetsPlayerAverageTable