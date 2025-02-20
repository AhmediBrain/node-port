import React, { useState } from 'react'
import AddToDoComponent from './AddToDoComponent'
import UsersInformationComponent from './UsersInformationComponent';
import FetchAPIComponent from './FetchAPIComponent';

const TestProjectsComponent = () => {
    const [showToDo, setShowToDo] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showApi, setShowApi] = useState(false);

    const handleShowTodo = () => {
        setShowToDo(!showToDo);
    }

    const handleShowInfo = () => {
        setShowInfo(!showInfo);
    }

    const handleShowAPI = () => {
        setShowApi(!showApi);
    }

    return (
        <div>
            <div style={{ borderBottom: '1px solid #b1aeae', borderTop: '1px solid #b1aeae' }}>
                <button 
                    onClick={handleShowTodo} 
                    style={{ margin: '10px', cursor: 'pointer' }}>
                    {showToDo ? 'Hide To Do Component' : 'Show To Do Component'}
                </button>
                {showToDo ? <AddToDoComponent /> : ''}
            </div>
            <div style={{ borderBottom: '1px solid #b1aeae' }}>
                <button 
                    onClick={handleShowInfo} 
                    style={{ margin: '10px', cursor: 'pointer' }}>
                    {showInfo ? 'Hide User Info Component' : 'Show User Info Component'}
                </button>
                {showInfo ? <UsersInformationComponent /> : ''}
            </div>
            <div style={{ borderBottom: '1px solid #b1aeae' }}>
                <button 
                    onClick={handleShowAPI} 
                    style={{ margin: '10px', cursor: 'pointer' }}>
                    {showApi ? 'Hide API Component' : 'Show API Component'}
                </button>
                {showApi ? <FetchAPIComponent /> : ''}
            </div>
        </div>
    )
}

export default TestProjectsComponent