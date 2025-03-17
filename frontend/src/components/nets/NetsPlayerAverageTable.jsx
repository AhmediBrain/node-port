import React, { useEffect, useState } from 'react'
import { netsAveTitle } from '../../json-data/formsData'
import axios from 'axios';
import { Link } from 'react-router-dom';

const NetsPlayerAverageTable = () => {
    //const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [netsSearch, setNetsSearch] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8030/teams')
        .then((result) => {
            setTeams(result.data);
            console.log('Result:', result.data)
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }, []);

    const handleNetsSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setNetsSearch(searchValue);
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
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1%', margin: '0 10px 10px 0' }}>
                    <input 
                        type='text' 
                        value={netsSearch} 
                        onChange={handleNetsSearchChange} 
                        style={{ border: '1px solid #b3a5e7', outline: 'none', padding: '5px 8px' }} />
                    <button>
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
                </table>
            </div>
        </div>
    )
}

export default NetsPlayerAverageTable