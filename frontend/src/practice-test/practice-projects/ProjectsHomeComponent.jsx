import React, { useState } from 'react'
import PracticeToDoListComponent from './PracticeToDoListComponent'
import PracticeAPIComponent from './PracticeAPIComponent';
import NbaNetsRosterComponent from './NbaNetsRosterComponent';
import PlayerAveragesComponent from './PlayerAveragesComponent';
import AddNewUserComponent from './AddNewUserComponent';

const ProjectsHomeComponent = () => {
    const [showTodo, setShowTodo] = useState(false);
    const [showAPI, setShowAPI] = useState(false);
    const [showNets, setShowNets] = useState(false);
    const [showPlayers, setShowPlayers] = useState(false);
    const [showUser, setShowUser] = useState(false);

    const handleShowToDo = () => {
        setShowTodo(!showTodo);
    }

    const handleShowAPI = () => {
        setShowAPI(!showAPI);
    }

    const handleShowNets = () => {
        setShowNets(!showNets);
    }

    const handleShowPlayers = () => {
        setShowPlayers(!showPlayers);
    }

    const handleShowUser = () => {
        setShowUser(!showUser);
    }

    return (
        <div>
            <div style={{ borderTop: '1px solid #c4c4c5', borderBottom: '1px solid #c4c4c5' }}>
                <button 
                    style={{ margin: '8px', cursor: 'pointer', border: '2px solid #aeddf7', borderRadius: '5px', padding: '5px', color: '#8eb6cc' }} 
                    onClick={handleShowToDo}>
                    {showTodo ? 'Hide To Do Component' : 'Show To Do Component'}
                </button>
                {showTodo ? <PracticeToDoListComponent /> : ''}
            </div>
            <div style={{ borderBottom: '1px solid #c4c4c5' }}>
                <button 
                    style={{ margin: '8px', cursor: 'pointer', border: '2px solid #e6bdf1', color: '#b494bd', borderRadius: '5px', padding: '5px' }} 
                    onClick={handleShowAPI}>
                    {showAPI ? 'Hide API Component' : 'Show API Component'}
                </button>
                {showAPI ? <PracticeAPIComponent /> : ''}
            </div>
            <div style={{ borderBottom: '1px solid #c4c4c5' }}>
                <button 
                    style={{ margin: '8px', cursor: 'pointer', border: '2px solid #9face0', color: '#7b85ad', borderRadius: '5px', padding: '5px' }} 
                    onClick={handleShowNets}>
                    {showNets ? 'Hide Nets Component' : 'Show Nets Component'}
                </button>
                {showNets ? <NbaNetsRosterComponent /> : ''}
            </div>

            <div style={{ borderBottom: '1px solid #c4c4c5' }}>
                <button 
                    style={{ margin: '8px', cursor: 'pointer', border: '2px solid #acbbf0', color: '#ee797f', borderRadius: '5px', padding: '5px' }} 
                    onClick={handleShowPlayers}>
                    {showPlayers ? 'Hide Players Component' : 'Show Players Component'}
                </button>
                {showPlayers ? <PlayerAveragesComponent /> : ''}
            </div>

            <div style={{ borderBottom: '1px solid #c4c4c5' }}>
                <button 
                    style={{ margin: '8px', cursor: 'pointer', border: '2px solid #c4c4c5', color: '#9763A6', borderRadius: '5px', padding: '5px' }} 
                    onClick={handleShowUser}>
                    {showUser ? 'Hide New User Component' : 'Show New User Component'}
                </button>
                {showUser ? <AddNewUserComponent /> : ''}
            </div>

        </div>
    )
}

export default ProjectsHomeComponent