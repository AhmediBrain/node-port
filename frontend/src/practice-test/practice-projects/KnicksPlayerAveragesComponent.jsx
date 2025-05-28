import React, { useEffect, useState } from 'react';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import { knicksTitle } from '../../json-data/formsData';

const KnicksPlayerAveragesComponent = () => {
    const [players, setPlayers] = useState([]);
    const [searchPlayer, setSearchPlayer] = useState('');
    const [editID, setEditID] = useState(null);
    const [editPosition, setEditPosition] = useState('');
    const [filteredPlayer, setFilteredPlayer] = useState([]);
    const [infoData, setInfoData] = useState({});

    const knicksApi = 'https://data.nba.com/data/v2015/json/mobile_teams/nba/2021/teams/knicks/player_averages_02.json';

    useEffect(() => {
        fetch(knicksApi)
        .then((response) => response.json())
        .then((result) => {
            setInfoData(result.tpsts);
            setPlayers(result.tpsts?.pl);
            setFilteredPlayer(result.tpsts?.pl);
        });
    }, []);

    const handleSearchPlayer = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchPlayer(searchValue);

        const filteredValue = filteredPlayer.filter(
            (player) => 
                player.fn.toLowerCase().includes(searchValue) || 
                player.ln.toLowerCase().includes(searchValue) || 
                player.pos.toLowerCase().includes(searchValue)
        );

        setPlayers(filteredValue);
    }

    const handleReset = () => {
        setSearchPlayer('');
        setPlayers(filteredPlayer);
    }

    const handleDeleteInfo = (pid) => {
        const updatedInfo = players.filter((player) => player.pid !== pid);
        setPlayers(updatedInfo);
    }

    const handleSaveInfo = (pid) => {
        const savedValue = players.map(
            (player) => 
                player.pid === pid ? { ...player, pos: editPosition } : player
        );

        setPlayers(savedValue);
        setEditID(null);
    }

    const handleEditInfo = (pid, currentPos) => {
        setEditID(pid);
        setEditPosition(currentPos);
    }

    return (
        <div style={{ 
                background: 'linear-gradient(180deg, rgba(245, 224, 207, 1) 0%, rgba(255, 255, 255, 1) 100%)',
                padding: '8px',
                margin: '8px' }}>
            <h5 style={{ margin: '0px', color: '#1C4086' }}>Knick's Player Information</h5>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 16px', padding: '8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                    <span style={{ fontSize: '11px', color: '#ED8025' }}><span style={{ fontWeight: 'bold', color: '#1C4086' }}>Team Abbreviation: </span>{infoData.ta}</span>
                    <span style={{ fontSize: '11px', color: '#ED8025' }}><span style={{ fontWeight: 'bold', color: '#1C4086' }}>Team City: </span>{infoData.tc}</span>
                    <span style={{ fontSize: '11px', color: '#ED8025' }}><span style={{ fontWeight: 'bold', color: '#1C4086' }}>Team ID#: </span>{infoData.tid}</span>
                    <span style={{ fontSize: '11px', color: '#ED8025' }}><span style={{ fontWeight: 'bold', color: '#1C4086' }}>Team Name: </span>{infoData.tn}</span>
                </div>
                <div style={{ display: 'flex', gap: '5%' }}>
                    <input 
                        type='text' 
                        value={searchPlayer} 
                        onChange={handleSearchPlayer} 
                        style={{ border: '1px solid #a8b4ca', outline: 'none', borderRadius: '6px', padding: '5px 8px' }} />
                    <button style={{ 
                        backgroundColor: '#FFFFFF',
                        border: '2px solid #E96725',
                        borderRadius: '6px',
                        cursor: 'pointer' }} 
                        onClick={handleReset}>
                        <AutorenewOutlinedIcon 
                            titleAccess='Refresh' 
                            sx={{ color: '#E96725' }} />
                    </button>
                </div>
            </div>

            <div style={{ overflowX: 'auto', margin: '10px' }}>
                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            {knicksTitle.map((info) => {
                                return (
                                    <th key={info.id} 
                                        style={{ padding: '5px', color: '#ED8025' }}>
                                        {info.title}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {players.map((player) => {
                            const { ast, blk, gp, min, oreb, pts } = player.avg;
                            return (
                                <tr key={player.pid}>
                                    <td style={{ fontSize: '14px', color: '#1C4086' }}>{player.pid}</td>
                                    <td style={{ fontSize: '14px', color: '#1C4086' }}>{`${player.fn} ${player.ln}`}</td>
                                    <td style={{ fontSize: '14px', color: '#1C4086' }}>
                                        {editID === player.pid ? (
                                            <input 
                                                type='text' 
                                                value={editPosition} 
                                                onChange={(e) => setEditPosition(e.target.value)} 
                                                style={{ border: '1px solid #a8b4ca', borderRadius: '6px', outline: 'none', padding: '5px 8px' }} />
                                        ) : (
                                            <>{player.pos}</>
                                        )}
                                    </td>
                                    <td style={{ textAlign: 'left', padding: '5px 16px' }}>
                                        <span style={{ fontSize: '10px', color: '#1C4086' }}><span style={{ fontWeight: 'bold' }}>Assists: </span>{ast}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: '#1C4086' }}><span style={{ fontWeight: 'bold' }}>Blocked Shots: </span>{blk}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: '#1C4086' }}><span style={{ fontWeight: 'bold' }}>Games Played: </span>{gp}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: '#1C4086' }}><span style={{ fontWeight: 'bold' }}>Minutes: </span>{min}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: '#1C4086' }}><span style={{ fontWeight: 'bold' }}>Offensive Rebounds: </span>{oreb}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: '#1C4086' }}><span style={{ fontWeight: 'bold' }}>Points: </span>{pts}</span>
                                    </td>
                                    <td style={{ textAlign: 'left', padding: '5px 16px' }}>
                                        <span style={{ fontSize: '10px', color: '#1C4086' }}><span style={{ fontWeight: 'bold' }}>Assits: </span>{player.tot.ast}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: '#1C4086' }}><span style={{ fontWeight: 'bold' }}>Blocked Shots: </span>{player.tot.blk}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: '#1C4086' }}><span style={{ fontWeight: 'bold' }}>Games Played: </span>{player.tot.gp}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: '#1C4086' }}><span style={{ fontWeight: 'bold' }}>Minutes: </span>{player.tot.min}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: '#1C4086' }}><span style={{ fontWeight: 'bold' }}>Offensive Rebounds: </span>{player.tot.oreb}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: '#1C4086' }}><span style={{ fontWeight: 'bold' }}>Points: </span>{player.tot.pts}</span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                            <button style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                                onClick={() => handleDeleteInfo(player.pid)}>
                                                <HighlightOffOutlinedIcon 
                                                    titleAccess='Delete' 
                                                    sx={{ color: '#C42B1C', fontSize: '30px' }} />
                                            </button>
                                            {editID === player.pid ? (
                                                <button style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                                    onClick={() => handleSaveInfo(player.pid)}>
                                                    <SaveOutlinedIcon 
                                                        titleAccess='Save' 
                                                        sx={{ color: '#13A10E', fontSize: '30px' }} />
                                                </button>
                                            ) : (
                                                <button style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                                    onClick={() => handleEditInfo(player.pid, player.pos)}>
                                                    <AppRegistrationOutlinedIcon 
                                                        titleAccess='Edit' 
                                                        sx={{ color: '#0078B9', fontSize: '30px' }} />
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

export default KnicksPlayerAveragesComponent