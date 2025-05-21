import React, { useEffect, useState } from 'react';
import { netsTitle } from '../practiceData';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';

const LakersRosterComponent = () => {
    const [searchText, setSearchText] = useState('');
    const [teamInfo, setTeamInfo] = useState({});
    const [lakers, setLakers] = useState([]);
    const [editID, setEditID] = useState(null);
    const [editNumber, setEditNumber] = useState('');

    const rosterUrl = 'https://data.nba.com/data/5s/v2015/json/mobile_teams/nba/2024/teams/lakers_roster.json';

    useEffect(() => {
        fetch(rosterUrl)
        .then((response) => response.json())
        .then((result) => {
            setTeamInfo(result.t);
            setLakers(result.t?.pl);
        })
    }, []);

    const handleSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchText(searchValue);
    }

    const handleReset = () => {
        setSearchText('');
    }

    const handleDeletePlayer = (pid) => {
        const updatedInfo = lakers.filter((user) => user.pid !== pid);
        setLakers(updatedInfo);
    }

    const handleSavePlayer = (pid) => {
        const savedValue = lakers.map(
            (user) => 
                user.pid === pid ? { ...user, num: editNumber } : user
        );

        setLakers(savedValue);
        setEditID(null);
    }

    const handleEditPlayer = (pid, currentNumber) => {
        setEditID(pid);
        setEditNumber(currentNumber);
    }

    return (
        <div>
            <h4 style={{ color: '#432676', margin: '0px' }}>Lakers Roster</h4>
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px', gap: '1%' }}>
                <input 
                    type='text' 
                    value={searchText} 
                    onChange={handleSearchChange} 
                    style={{ border: '1px solid #a784e4', outline: 'none', padding: '5px 8px' }} />
                <button 
                    style={{ border: '2px solid #eb824d', color: '#E96725', fontWeight: 'bold', borderRadius: '5px', cursor: 'pointer' }} 
                    onClick={handleReset}>
                    Reset
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #a784e4', padding: '8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '11px', color: '#432676' }}><span style={{ fontWeight: 'bold' }}>Team Abbreviation: </span>{teamInfo.ta}</span>
                    <span style={{ fontSize: '11px', color: '#432676' }}><span style={{ fontWeight: 'bold' }}>Team City: </span>{teamInfo.tc}</span>
                    <span style={{ fontSize: '11px', color: '#432676' }}><span style={{ fontWeight: 'bold' }}>Team Name: </span>{teamInfo.tn}</span>
                    <span style={{ fontSize: '11px', color: '#432676' }}><span style={{ fontWeight: 'bold' }}>Team ID# </span>{teamInfo.tid}</span>
                </div>
                <div style={{ overflowX: 'auto', marginTop: '10px' }}>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                {netsTitle.map((user) => {
                                    return (
                                        <th key={user.id} 
                                            style={{ color: '#F5B326', padding: '5px' }}>
                                            {user.title}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {lakers.map((user) => {
                                return (
                                    <tr key={user.pid}>
                                        <td style={{ color: '#65508a', fontSize: '14px', padding: '5px' }}>{user.fn}</td>
                                        <td style={{ color: '#65508a', fontSize: '14px', padding: '5px' }}>{user.ln}</td>
                                        <td style={{ color: '#65508a', fontSize: '14px', padding: '5px' }}>
                                            {editID === user.pid ? (
                                                <input 
                                                    type='text' 
                                                    value={editNumber} 
                                                    onChange={(e) => setEditNumber(e.target.value)} 
                                                    style={{ border: '1px solid #a784e4', outline: 'none', padding: '5px 8px' }} />
                                            ) : (
                                                <>{user.num}</>
                                            )}
                                        </td>
                                        <td style={{ color: '#65508a', fontSize: '14px', padding: '5px' }}>{user.pos}</td>
                                        <td style={{ color: '#65508a', fontSize: '14px', padding: '5px' }}>{user.dob}</td>
                                        <td style={{ color: '#65508a', fontSize: '14px', padding: '5px' }}>{user.ht}</td>
                                        <td style={{ color: '#65508a', fontSize: '14px', padding: '5px' }}>{user.wt}</td>
                                        <td style={{ color: '#65508a', fontSize: '14px', padding: '5px' }}>{user.twc}</td>
                                        <td style={{ color: '#65508a', fontSize: '14px', padding: '5px' }}>{user.hcc}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '1%', justifyContent: 'space-around' }}>
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
        </div>
    )
}

export default LakersRosterComponent