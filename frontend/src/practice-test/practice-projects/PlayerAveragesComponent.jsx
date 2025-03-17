import React, { useEffect, useState } from 'react';
import { playerTitle } from '../practiceData';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';

const PlayerAveragesComponent = () => {
    const [players, setPlayers] = useState([]);
    const [teamInfo, setTeamInfo] = useState({});
    const [searchText, setSearchText] = useState('');
    const [editID, setEditID] = useState(null);
    const [editPos, setEditPos] = useState('');
    const [filteredPlayer, setFilteredPlayer] = useState([]);

    // #DE1924, #111A3C

    const netsUrl = 'https://data.nba.com/data/v2015/json/mobile_teams/nba/2021/teams/nets/player_averages_02.json';

    useEffect(() => {
        fetch(netsUrl)
        .then((response) => response.json())
        .then((result) => {
            setTeamInfo(result.tpsts || {});
            setPlayers(result.tpsts?.pl || []);
            setFilteredPlayer(result.tpsts?.pl || []);
        });
    }, []);

    const handleSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchText(searchValue);

        const filteredValue = filteredPlayer.filter(
            (player) => 
                player.pid.toLowerCase().includes(searchValue) || 
                player.fn.toLowerCase().includes(searchValue) || 
                player.ln.toLowerCase().includes(searchValue)
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
                player.pid === pid ? { ...player, pos: editPos } : player
        );

        setPlayers(savedValue);
        setEditID(null);
    }

    const handleEditPlayer = (pid, currentPos) => {
        setEditID(pid);
        setEditPos(currentPos);
    }

    return (
        <div style={{ backgroundColor: '#eaedf5', padding: '2px' }}>
            <h4 style={{ color: '#d36167' }}>Nets Player Averages</h4>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '2%', margin: '0 10px 16px 0' }}>
                <input 
                    type='text' 
                    value={searchText} 
                    onChange={handleSearchChange} 
                    style={{ border: '1px solid #8ba1f1', outline: 'none', padding: '5px 8px' }} 
                    placeholder='Search ...' />
                <button 
                    style={{ border: '2px solid #EF7613', borderRadius: '5px', color: '#EF7613', fontWeight: 'bold', cursor: 'pointer' }} 
                    onClick={handleReset}>
                    Reset
                </button>
            </div>

            <div style={{ border: '1px solid #8ba1f1', padding: '8px', overflowX: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
                    <span style={{ color: '#3d4f8d', fontSize: '13px' }}><span style={{ fontWeight: 'bold' }}>Team ID# </span>{teamInfo.tid}</span>
                    <span style={{ color: '#3d4f8d', fontSize: '13px' }}><span style={{ fontWeight: 'bold' }}>Abbreviation: </span>{teamInfo.ta}</span>
                    <span style={{ color: '#3d4f8d', fontSize: '13px' }}><span style={{ fontWeight: 'bold' }}>Team Name: </span>{teamInfo.tn}</span>
                    <span style={{ color: '#3d4f8d', fontSize: '13px' }}><span style={{ fontWeight: 'bold' }}>Team City: </span>{teamInfo.tc}</span>
                </div>
                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            {playerTitle.map((player) => {
                                return (
                                    <th key={player.id} 
                                        style={{ padding: '8px', color: '#3d4f8d' }}>
                                        {player.title}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {players.map((player) => {
                            const { ast, blk, min, pts, stl } = player.avg;

                            return (
                                <tr key={player.pid}>
                                    <td style={{ fontSize: '14px', color: '#486db8' }}>{player.pid}</td>
                                    <td style={{ fontSize: '14px', color: '#6580b6' }}>{player.fn}</td>
                                    <td style={{ fontSize: '14px', color: '#6580b6' }}>{player.ln}</td>
                                    <td style={{ fontSize: '14px', color: '#6580b6' }}>
                                        {editID === player.pid ? (
                                            <input 
                                                type='text' 
                                                value={editPos} 
                                                onChange={(e) => setEditPos(e.target.value)} 
                                                style={{ border: '1px solid #8ba1f1', outline: 'none', padding: '5px 8px' }} />
                                        ) : (
                                            <>{player.pos}</>
                                        )}
                                    </td>
                                    <td>
                                        <span style={{ fontSize: '10px', color: '#6580b6' }}><span style={{ fontWeight: 'bold' }}>Assists: </span>{ast}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: '#6580b6' }}><span style={{ fontWeight: 'bold' }}>Blocks: </span>{blk}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: '#6580b6' }}><span style={{ fontWeight: 'bold' }}>Minutes: </span>{min}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: '#6580b6' }}><span style={{ fontWeight: 'bold' }}>Points: </span>{pts}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: '#6580b6' }}><span style={{ fontWeight: 'bold' }}>Steals: </span>{stl}</span>
                                    </td>
                                    <td>
                                        <span style={{ fontSize: '10px', color: '#6580b6' }}><span style={{ fontWeight: 'bold' }}>Assists: </span>{player.tot.ast}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: '#6580b6' }}><span style={{ fontWeight: 'bold' }}>Blocks: </span>{player.tot.blk}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: '#6580b6' }}><span style={{ fontWeight: 'bold' }}>Minutes: </span>{player.tot.min}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: '#6580b6' }}><span style={{ fontWeight: 'bold' }}>Points: </span>{player.tot.pts}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: '#6580b6' }}><span style={{ fontWeight: 'bold' }}>Steals: </span>{player.tot.stl}</span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                            <button 
                                                style={{ border: 'none', padding: '0px', background: 'transparent', cursor: 'pointer' }} 
                                                onClick={() => handleDeletePlayer(player.pid)}>
                                                <HighlightOffOutlinedIcon 
                                                    sx={{ color: '#CB4538' }} 
                                                    titleAccess='Delete' />
                                            </button>
                                            {editID === player.pid ? (
                                                <button 
                                                    style={{ border: 'none', padding: '0px', background: 'transparent', cursor: 'pointer' }} 
                                                    onClick={() => handleSavePlayer(player.pid)}>
                                                    <SaveOutlinedIcon 
                                                        sx={{ color: '#2B9D4A' }} 
                                                        titleAccess='Save' />
                                                </button>
                                            ) : (
                                                <button 
                                                    style={{ border: 'none', padding: '0px', background: 'transparent', cursor: 'pointer' }} 
                                                    onClick={() => handleEditPlayer(player.pid, player.pos)}>
                                                    <AppRegistrationOutlinedIcon 
                                                        sx={{ color: '#007ABB' }} 
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

export default PlayerAveragesComponent