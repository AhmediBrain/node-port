import React, { useState } from 'react'
import BasicToDoComponent from './BasicToDoComponent';
import UsersInformationComponent from './UsersInformationComponent';
import UsersFetchComponent from './UsersFetchComponent';
import TextAnimationComponent from './TextAnimationComponent';

const ProjectHomeComponent = () => {
    const [addShow, setAddShow] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [showFetch, setShowFetch] = useState(false);
    const [showText, setShowText] = useState(false);

    const handleShowTodo = () => {
        setAddShow(!addShow);
    }

    const handleShowUsers = () => {
        setShowUsers(!showUsers);
    }

    const handleShowFetch = () => {
        setShowFetch(!showFetch);
    }

    const handleShowText = () => {
        setShowText(!showText);
    }

    return (
        <div>
            <div style={{ borderBottom: '1px solid #cccbcb', borderTop: '1px solid #cccbcb' }}>
                <button 
                    onClick={handleShowTodo} 
                    style={{ margin: '10px', cursor: 'pointer' }}>
                    {addShow ? 'Hide To Do Component' : 'Show To Do Component'}
                </button>
                {addShow ? <BasicToDoComponent /> : ''}
            </div>
            <div style={{ borderBottom: '1px solid #cccbcb' }}>
                <button 
                    onClick={handleShowUsers} 
                    style={{ margin: '10px', cursor: 'pointer' }}>
                    {showUsers ? 'Hide Users Information' : 'Show Users Information'}
                </button>
                {showUsers ? <UsersInformationComponent /> : ''}
            </div>
            <div style={{ borderBottom: '1px solid #cccbcb' }}>
                <button 
                    onClick={handleShowFetch} 
                    style={{ margin: '10px', cursor: 'pointer' }}>
                    {showFetch ? 'Hide Fetch Users' : 'Show Fetch Users'}
                </button>
                {showFetch ? <UsersFetchComponent /> : ''}
            </div>
            <div style={{ borderBottom: '1px solid #cccbcb' }}>
                <button 
                    onClick={handleShowText} 
                    style={{ margin: '10px', cursor: 'pointer' }}>
                    {showText ? 'Hide Text Animation' : 'Show Text Animation'}
                </button>
                {showText ? <TextAnimationComponent /> : ''}
            </div>
        </div>
    )
}

export default ProjectHomeComponent