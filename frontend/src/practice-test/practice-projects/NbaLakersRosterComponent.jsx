import React, { useEffect, useState } from 'react';
import { lakersTitle } from '../../json-data/formsData';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';

const NbaLakersRosterComponent = () => {
    const lakersUrl = 'https://data.nba.com/data/v2015/json/mobile_teams/nba/2023/teams/lakers/player_averages_02.json';

    const [searchText, setSearchText] = useState('');
    const [teamInfo, setTeamInfo] = useState({});
    const [lakers, setLakers] = useState([]);
    const [editID, setEditID] = useState(null);
    const [editPosition, setEditPosition] = useState('');
    const [filteredLakers, setFilteredLakers] = useState([]);

    useEffect(() => {
        fetch(lakersUrl)
        .then((response) => response.json())
        .then((result) => {
            setTeamInfo(result.tpsts);
            setLakers(result.tpsts?.pl);
            setFilteredLakers(result.tpsts?.pl);
        })
    }, []);

    const handleSearchValue = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchText(searchValue);

        const filteredValue = filteredLakers.filter(
            (user) => 
                user.pid.toLowerCase().includes(searchValue) || 
                user.fn.toLowerCase().includes(searchValue) || 
                user.ln.toLowerCase().includes(searchValue)
        );

        setLakers(filteredValue);
    }

    const handleReset = () => {
        setSearchText('');
        setLakers(filteredLakers);
    }

    const handleDeleteRow = (pid) => {
        const updatedRow = lakers.filter((user) => user.pid !== pid);
        setLakers(updatedRow);

        setFilteredLakers(filteredLakers.filter((user) => user.pid !== pid));
    }

    const handleSavePosition = (pid) => {
        const savedValue = lakers.map(
            (user) => 
                user.pid === pid ? { ...user, pos: editPosition } : user
        );

        setLakers(savedValue);
        setEditID(null);
    }

    const handleEditPosition = (pid, currentPosition) => {
        setEditID(pid);
        setEditPosition(currentPosition);
    }

    return (
        <div style={{ backgroundColor: '#efeff7', padding: '8px' }}>
            <h5 style={{ color: '#2F006C' }}>Lakers Player's Information</h5>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '2%', margin: '0 10px 10px 0' }}>
                <input 
                    type='text' 
                    value={searchText} 
                    onChange={handleSearchValue} 
                    style={{ border: '1px solid #9956f1', outline: 'none', padding: '5px 8px' }} />
                <button 
                    style={{ border: '2px solid #E96725', color: '#E96725', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }} 
                    onClick={handleReset}>
                    Reset
                </button>
            </div>
            <div style={{ border: '1px solid #9956f1', padding: '1%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginBottom: '10px' }}>
                    <span style={{ fontSize: '13px', color: '#7a45be' }}><span style={{ fontWeight: 'bold' }}>Team ID# </span>{teamInfo.tid}</span>
                    <span style={{ fontSize: '13px', color: '#7a45be' }}><span style={{ fontWeight: 'bold' }}>Team Abbreviation: </span>{teamInfo.ta}</span>
                    <span style={{ fontSize: '13px', color: '#7a45be' }}><span style={{ fontWeight: 'bold' }}>Team Name: </span>{teamInfo.tn}</span>
                    <span style={{ fontSize: '13px', color: '#7a45be' }}><span style={{ fontWeight: 'bold' }}>Team City: </span>{teamInfo.tc}</span>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                {lakersTitle.map((user) => {
                                    return (
                                        <th key={user.id} 
                                            style={{ padding: '5px', color: '#7a45be' }}>
                                            {user.title}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>

                        <tbody>
                            {lakers.map((user) => {
                                const { ast, blk, min, stl, tov } = user.avg

                                return (
                                    <tr key={user.pid}>
                                        <td style={{ color: '#7a5aa5' }}>{user.pid}</td>
                                        <td style={{ color: '#7a5aa5' }}>{user.fn}</td>
                                        <td style={{ color: '#7a5aa5' }}>{user.ln}</td>
                                        <td style={{ color: '#7a5aa5' }}>
                                            {editID === user.pid ? (
                                                <input 
                                                    type='text' 
                                                    value={editPosition} 
                                                    onChange={(e) => setEditPosition(e.target.value)} 
                                                    style={{ border: '1px solid #9956f1', outline: 'none', padding: '5px 8px' }} />
                                            ) : (
                                                <>{user.pos}</>
                                            )}
                                        </td>
                                        <td>
                                            <span style={{ fontSize: '10px', color: '#7a5aa5' }}><span style={{ fontWeight: 'bold' }}>Assists: </span>{ast}</span>
                                            <br />
                                            <span style={{ fontSize: '10px', color: '#7a5aa5' }}><span style={{ fontWeight: 'bold' }}>Blocks: </span>{blk}</span>
                                            <br />
                                            <span style={{ fontSize: '10px', color: '#7a5aa5' }}><span style={{ fontWeight: 'bold' }}>Minutes: </span>{min}</span>
                                            <br />
                                            <span style={{ fontSize: '10px', color: '#7a5aa5' }}><span style={{ fontWeight: 'bold' }}>Steals: </span>{stl}</span>
                                            <br />
                                            <span style={{ fontSize: '10px', color: '#7a5aa5' }}><span style={{ fontWeight: 'bold' }}>Turnover: </span>{tov}</span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                <button 
                                                    style={{ border: 'none', padding: '0px', background: 'transparent', cursor: 'pointer' }} 
                                                    onClick={() => handleDeleteRow(user.pid)}>
                                                    <HighlightOffOutlinedIcon 
                                                        sx={{ color: '#C42B1C' }} 
                                                        titleAccess='Delete' />
                                                </button>
                                                {editID === user.pid ? (
                                                    <button 
                                                        style={{ border: 'none', padding: '0px', background: 'transparent', cursor: 'pointer' }} 
                                                        onClick={() => handleSavePosition(user.pid)}>
                                                        <SaveOutlinedIcon 
                                                            sx={{ color: '#13A10E' }} 
                                                            titleAccess='Save' />
                                                    </button>
                                                ) : (
                                                    <button 
                                                        style={{ border: 'none', padding: '0px', background: 'transparent', cursor: 'pointer' }} 
                                                        onClick={() => handleEditPosition(user.pid, user.pos)}>
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

export default NbaLakersRosterComponent