import React, { useState } from 'react';
import ProjectsAddNewUserComponent from './ProjectsAddNewUserComponent';
import ImageConverterApp from './ImageConverterApp';

const AboutProjectsComponent = () => {
    const [showNewUser, setShowNewUser] = useState(false);
    const [showImage, setShowImage] = useState(false);

    //const color = '#e5dcf3';

    return (
        <div style={{ padding: '8px', display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ margin: '0px', color: '#7c9fe9' }}>Select Projects</h4>
            <div style={{ borderTop: '1px solid #c4c4c5', borderBottom: '1px solid #c4c4c5', margin: '8px 8px 0px 8px', padding: '8px' }}>
                <button style={{ border: '2px solid #9c89be', color: '#8766be', padding: '5px 8px', borderRadius: '6px', cursor: 'pointer' }} 
                    onClick={() => setShowNewUser(!showNewUser)}>
                    {showNewUser ? 'Hide New User' : 'Show New User'}
                </button>
                {showNewUser ? <ProjectsAddNewUserComponent /> : ''}
            </div>
            <div style={{ borderBottom: '1px solid #c4c4c5', margin: '8px', padding: '8px' }}>
                <button style={{ border: '2px solid #527c91', color: '#527c91', padding: '5px 8px', borderRadius: '6px', cursor: 'pointer' }} 
                    onClick={() => setShowImage(!showImage)}>
                    {showImage ? 'Hide Image Converter' : 'Show Image Converter'}
                </button>
                {showImage ? <ImageConverterApp /> : ''}
            </div>
        </div>
    )
}

export default AboutProjectsComponent