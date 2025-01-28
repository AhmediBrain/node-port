import React, { useState } from 'react'
import BasicAnimationFunction from './BasicAnimationFunction'
import BasicAddDeleteFunction from './BasicAddDeleteFunction'
import AddNewUserComponent from './AddNewUserComponent'
import PlaceholderApiComponent from './PlaceholderApiComponent'

const BasicHomeComponent = () => {
    const [addShow, setAddShow] = useState(false);
    const [showAnime, setShowAnime] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [showApi, setShowApi] = useState(false);


    const showAddDelete = () => {
        setAddShow(!addShow);
    }

    const showAnimation = () => {
        setShowAnime(!showAnime);
    }

    const showAddUserFunction = () => {
        setShowUser(!showUser);
    }

    const showAPIFunction = () => {
        setShowApi(!showApi);
    }
    
    return (
        <div>
            <div style={{ borderBottom: '1px solid #cccbcb', borderTop: '1px solid #cccbcb' }}>
                <button 
                    onClick={showAddDelete} 
                    style={{ margin: '10px' }}>
                    {addShow ? 'Hide Basic Functions' : 'Show Basic Functions'}
                </button>
                {addShow ? <BasicAddDeleteFunction /> : ''}
            </div>
            <div style={{ borderBottom: '1px solid #cccbcb' }}>
                <button 
                    onClick={showAnimation} 
                    style={{ margin: '10px' }}>
                    {showAnime ? 'Hide Animation Function' : 'Show Animation Function'}
                </button>
                {showAnime ? <BasicAnimationFunction /> : ''}
            </div>
            <div style={{ borderBottom: '1px solid #cccbcb' }}>
                <button 
                    onClick={showAddUserFunction} 
                    style={{ margin: '10px' }}>
                    {showUser ? 'Hide Add User Function' : 'Show Add User Function'}
                </button>
                {showUser ? <AddNewUserComponent /> : ''}
            </div>
            <div>
                <button 
                    onClick={showAPIFunction} 
                    style={{ margin: '10px' }}>
                    {showApi ? 'Hide API Function' : 'Show API Function'}
                </button>
                {showApi ? <PlaceholderApiComponent /> : ''}
            </div>
        </div>
    )
}

export default BasicHomeComponent