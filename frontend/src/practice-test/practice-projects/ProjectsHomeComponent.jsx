import React, { useState } from 'react'
import PracticeToDoListComponent from './PracticeToDoListComponent'
import PracticeAPIComponent from './PracticeAPIComponent';
import NbaNetsRosterComponent from './NbaNetsRosterComponent';
import PlayerAveragesComponent from './PlayerAveragesComponent';
import AddNewUserComponent from './AddNewUserComponent';
import NbaLakersRosterComponent from './NbaLakersRosterComponent';
import StudentPushInRequest from './StudentPushInRequest';
import LakersRosterComponent from './LakersRosterComponent';
import NewUserAddingComponent from './NewUserAddingComponent';
import ToDoListAddingApp from './ToDoListAddingApp';

const ProjectsHomeComponent = () => {
    const [showTodo, setShowTodo] = useState(false);
    const [showAPI, setShowAPI] = useState(false);
    const [showNets, setShowNets] = useState(false);
    const [showPlayers, setShowPlayers] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [showLakers, setShowLakers] = useState(false);
    const [showPushIn, setShowPushIn] = useState(false);
    const [showRoster, setShowRoster] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showList, setShowList] = useState(false);

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

    const handleShowLakers = () => {
        setShowLakers(!showLakers);
    }

    const handleShowPushIn = () => {
        setShowPushIn(!showPushIn);
    }

    const handleLakersRoster = () => {
        setShowRoster(!showRoster);
    }

    const handleShowNew = () => {
        setShowNew(!showNew);
    }

    const handleShowList = () => {
        setShowList(!showList);
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

            <div style={{ borderBottom: '1px solid #c4c4c5' }}>
                <button 
                    style={{ margin: '8px', cursor: 'pointer', border: '2px solid #9c93a8', color: '#F5B326', borderRadius: '5px', padding: '5px' }} 
                    onClick={handleShowLakers}>
                    {showLakers ? 'Hide Lakers Component' : 'Show Lakers Component'}
                </button>
                {showLakers ? <NbaLakersRosterComponent /> : ''}
            </div>

            <div style={{ borderBottom: '1px solid #c4c4c5' }}>
                <button 
                    style={{ margin: '8px', cursor: 'pointer', border: '2px solid #a8b9b0', color: '#579b77', borderRadius: '5px', padding: '5px' }} 
                    onClick={handleShowPushIn}>
                    {showPushIn ? 'Hide Push-In Request' : 'Show Push-In Request'}
                </button>
                {showPushIn ? <StudentPushInRequest /> : ''}
            </div>

            <div style={{ borderBottom: '1px solid #c4c4c5' }}>
                <button 
                    style={{ margin: '8px', cursor: 'pointer', border: '2px solid #9c89be', color: '#432676', borderRadius: '5px', padding: '5px' }} 
                    onClick={handleLakersRoster}>
                    {showRoster ? 'Hide Lakers Roster' : 'Show Lakers Roster'}
                </button>
                {showRoster ? <LakersRosterComponent /> : ''}
            </div>

            <div style={{ borderBottom: '1px solid #c4c4c5' }}>
                <button 
                    style={{ margin: '8px', cursor: 'pointer', border: '2px solid #CFE0D6', color: '#1C472F', borderRadius: '5px', padding: '5px' }} 
                    onClick={handleShowNew}>
                    {showNew ? 'Hide Add New Component' : 'Show Add New Component'}
                </button>
                {showNew ? <NewUserAddingComponent /> : ''}
            </div>
            
            <div style={{ borderBottom: '1px solid #c4c4c5' }}>
                <button 
                    style={{ margin: '8px', cursor: 'pointer', border: '2px solid #CDDAEA', color: '#0078B9', borderRadius: '5px', padding: '5px' }} 
                    onClick={handleShowList}>
                    {showList ? 'Hide Add To Do List' : 'Show Add To Do List'}
                </button>
                {showList ? <ToDoListAddingApp /> : ''}
            </div>

        </div>
    )
}

export default ProjectsHomeComponent