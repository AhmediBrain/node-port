import React, { useEffect, useState } from 'react';
import { netsTitle } from '../practiceData';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';

const NbaNetsRosterComponent = () => {
    const [searchText, setSearchText] = useState('');
    const [teams, setTeams] = useState([]);
    const [editID, setEditID] = useState(null);
    const [editNumber, setEditNumber] = useState('');
    const [filteredTeams, setFilteredTeams] = useState([]);

    const teamsUrl = 'https://data.nba.com/data/5s/v2015/json/mobile_teams/nba/2021/teams/nets_roster.json';

    useEffect(() => {
        fetch(teamsUrl)
        .then((response) => response.json())
        .then((result) => {
            setTeams(result.t?.pl);
            setFilteredTeams(result.t?.pl);
        });
    }, []);

    const handleSearchText = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchText(searchValue);

        const filteredValue = filteredTeams.filter(
            (user) => 
                user.fn.toLowerCase().includes(searchValue) || 
                user.ln.toLowerCase().includes(searchValue)
        );

        setTeams(filteredValue);
    }

    const handleReset = () => {
        setSearchText('');
        setTeams(filteredTeams);
    }

    const handleDeletePlayer = (pid) => {
        const updatedTeams = teams.filter((user) => user.pid !== pid);
        setTeams(updatedTeams);
    }

    const handleSavePlayer = (pid) => {
        const savedValue = teams.map(
            (user) => 
                user.pid === pid ? { ...user, num: editNumber } : user
        );

        setTeams(savedValue);
        setEditID(null);
    }

    const handleEditPlayer = (pid, currentNumber) => {
        setEditID(pid);
        setEditNumber(currentNumber);
    }

    return (
        <div style={{ backgroundColor: '#ecedf3', padding: '8px' }}>
            <h5 style={{ color: '#838eb8', margin: '0px' }}>Nets Player's Information</h5>
            <div 
                style={{ display: 'flex', justifyContent: 'flex-end', gap: '2%', margin: '10px 10px 0px 0px' }}>
                <input 
                    type='text' 
                    value={searchText} 
                    onChange={handleSearchText}
                    style={{ border: '1px solid #aebbf0', outline: 'none', padding: '5px 8px' }} />
                <button 
                    style={{ border: '2px solid #E96725', color: '#E96725', fontWeight: 'bold', borderRadius: '5px', cursor: 'pointer' }} 
                    onClick={handleReset}>
                    Reset
                </button>
            </div>
            <div style={{ margin: '16px 0px', overflowX: 'auto' }}>
                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            {netsTitle.map((user) => {
                                return (
                                    <th key={user.id} 
                                        style={{ color: '#9face0', padding: '5px' }}>
                                        {user.title === 'Action' ? <span style={{ fontSize: '10px' }}>{user.title}</span> : <span>{user.title}</span>}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {teams.map((user) => {
                            return (
                                <tr key={user.pid}>
                                    <td style={{ color: '#7f8ab3', fontSize: '14px', padding: '5px' }}>{user.fn}</td>
                                    <td style={{ color: '#7f8ab3', fontSize: '14px', padding: '5px' }}>{user.ln}</td>
                                    <td style={{ color: '#7f8ab3', fontSize: '14px', padding: '5px' }}>
                                        {editID === user.pid ? (
                                            <input 
                                                type='text' 
                                                value={editNumber} 
                                                onChange={(e) => setEditNumber(e.target.value)} 
                                                style={{ border: '1px solid #aebbf0', outline: 'none', padding: '5px 8px' }} />
                                        ) : (
                                            <>{user.num}</>
                                        )}
                                    </td>
                                    <td style={{ color: '#7f8ab3', fontSize: '14px', padding: '5px' }}>{user.pos}</td>
                                    <td style={{ color: '#7f8ab3', fontSize: '14px', padding: '5px' }}>{user.dob}</td>
                                    <td style={{ color: '#7f8ab3', fontSize: '14px', padding: '5px' }}>{user.ht}</td>
                                    <td style={{ color: '#7f8ab3', fontSize: '14px', padding: '5px' }}>{user.wt}</td>
                                    <td style={{ color: '#7f8ab3', fontSize: '14px', padding: '5px' }}>{user.twc}</td>
                                    <td style={{ color: '#7f8ab3', fontSize: '14px', padding: '5px' }}>{user.hcc}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '1%', justifyContent: 'space-between', padding: '5px' }}>
                                            <button 
                                                style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                                onClick={() => handleDeletePlayer(user.pid)}>
                                                <HighlightOffOutlinedIcon 
                                                    sx={{ color: '#C42B1C' }} 
                                                    titleAccess='Delete' />
                                            </button>
                                            {editID === user.pid ? (
                                                <button 
                                                    style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                                    onClick={() => handleSavePlayer(user.pid)}>
                                                    <SaveOutlinedIcon 
                                                        sx={{ color: '#13A10E' }} 
                                                        titleAccess='Save' />
                                                </button>
                                            ) : (
                                                <button 
                                                    style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                                    onClick={() => handleEditPlayer(user.pid, user.num)}>
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

export default NbaNetsRosterComponent