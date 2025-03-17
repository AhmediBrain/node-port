import React, { useEffect, useState } from 'react';
import { netsTitle } from '../practiceData';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';

const NbaNetsRosterComponent = () => {
    const [players, setPlayers] = useState([]);
    const [filteredPlayer, setFilteredPlayer] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [teamInfo, setTeamInfo] = useState({});
    const [editID, setEditID] = useState(null);
    const [editNum, setEditNum] = useState('');

    const netsUrl = 'https://data.nba.com/data/5s/v2015/json/mobile_teams/nba/2021/teams/nets_roster.json';

    useEffect(() => {
        fetch(netsUrl)
        .then((response) => response.json())
        .then((result) => {
            setTeamInfo(result.t || {});
            setPlayers(result.t?.pl || []);
            setFilteredPlayer(result.t?.pl || []);
        });
    }, []);

    const handleSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchText(searchValue);

        const filteredValue = filteredPlayer.filter(
            (item) => 
                item.fn.toLowerCase().includes(searchValue) || 
                item.ln.toLowerCase().includes(searchValue) || 
                item.num.toLowerCase().includes(searchValue)
        );

        setPlayers(filteredValue);
    }

    const handleReset = () => {
        setSearchText('');
        setPlayers(filteredPlayer);
    }

    const handleDeletePlayer = (pid) => {
        const updatedPlayer = players.filter((player) => player.pid !== pid);
        setPlayers(updatedPlayer);
        setFilteredPlayer(filteredPlayer.filter((player) => player.pid !== pid));
    }

    const handleSavePlayer = (pid) => {
        const savedValue = players.map(
            (player) => 
                player.pid === pid ? { ...player, num: editNum } : player
        );

        setPlayers(savedValue);
        setEditID(null);
    }

    const handleEditPlayer = (pid, currentNum) => {
        setEditID(pid);
        setEditNum(currentNum);
    }

    const handleNumberChange = (e) => {
        setEditNum(e.target.value);
    }

    return (
        <div style={{ backgroundColor: '#eceff8', padding: '2px' }}>
            <h4 style={{ color: '#222944' }}>Nets Roster Information</h4>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '2%', margin: '0 10px 16px 0' }}>
                <input 
                    type='text' 
                    value={searchText} 
                    onChange={handleSearchChange} 
                    style={{ border: '1px solid #95a8f3', outline: 'none', padding: '5px 8px' }} />
                <button 
                    style={{ border: '2px solid #EA6523', borderRadius: '5px', color: '#EA6523', fontWeight: 'bold', cursor: 'pointer' }} 
                    onClick={handleReset}>
                    Reset
                </button>
            </div>

            <div style={{ border: '1px solid #95a8f3', padding: '8px', overflowX: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '13px', color: '#404c7c' }}><span style={{ fontWeight: 'bold' }}>Team ID# </span>{teamInfo.tid}</span>
                    <span style={{ fontSize: '13px', color: '#404c7c' }}><span style={{ fontWeight: 'bold' }}>Abbreviation: </span>{teamInfo.ta}</span>
                    <span style={{ fontSize: '13px', color: '#404c7c' }}><span style={{ fontWeight: 'bold' }}>Team Name: </span>{teamInfo.tn}</span>
                    <span style={{ fontSize: '13px', color: '#404c7c' }}><span style={{ fontWeight: 'bold' }}>Team City: </span>{teamInfo.tc}</span>
                </div>
                <table style={{ marginTop: '10px', width: '100%' }}>
                    <thead>
                        <tr>
                            {netsTitle.map((player) => {
                                return (
                                    <th key={player.id} 
                                        style={{ padding: '8px', color: '#5463a0' }}>
                                        {player.title}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {players.map((player) => {
                            return (
                                <tr key={player.pid}>
                                    <td>{player.fn}</td>
                                    <td>{player.ln}</td>
                                    <td>
                                        {editID === player.pid ? (
                                            <input 
                                                type='text' 
                                                value={editNum} 
                                                onChange={handleNumberChange} 
                                                style={{ border: '1px solid #95a8f3', outline: 'none', padding: '5px 8px' }} />
                                        ) : (
                                            <>{player.num}</>
                                        )}
                                    </td>
                                    <td>{player.pos}</td>
                                    <td>{player.dob}</td>
                                    <td>{player.ht}</td>
                                    <td>{player.wt}</td>
                                    <td>{player.twc}</td>
                                    <td>{player.hcc}</td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                            <button 
                                                style={{ border: 'none', padding: '0px', background: 'transparent', cursor: 'pointer' }} 
                                                onClick={() => handleDeletePlayer(player.pid)}>
                                                <HighlightOffOutlinedIcon 
                                                    sx={{ color: '#E43D30' }} 
                                                    titleAccess='Delete' />
                                            </button>
                                            {editID === player.pid ? (
                                                <button 
                                                    style={{ border: 'none', padding: '0px', background: 'transparent', cursor: 'pointer' }} 
                                                    onClick={() => handleSavePlayer(player.pid)}>
                                                    <SaveOutlinedIcon 
                                                        sx={{ color: '#299B48' }} 
                                                        titleAccess='Save' />
                                                </button>
                                            ) : (
                                                <button 
                                                    style={{ border: 'none', padding: '0px', background: 'transparent', cursor: 'pointer' }} 
                                                    onClick={() => handleEditPlayer(player.pid, player.num)}>
                                                    <AppRegistrationOutlinedIcon 
                                                        sx={{ color: '#0076B8' }} 
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