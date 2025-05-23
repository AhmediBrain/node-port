import React, { useEffect, useState } from 'react'

const BasicAnimationFunction = () => {
    const [text, setText] = useState('Full Stack Developer.');

    useEffect(() => {
        const updatedText = setInterval(() => {
            setText('Professional Coder.');
            setTimeout(() => {
                setText('Full Stack Developer.');
            }, 2000);
        }, 4000);

        return () => clearInterval(updatedText);
    }, []);

    return (
        <div style={{ marginBottom: '10px' }}>
            <h5>Text Animation Function</h5>
            <div>
                <span style={{ fontSize: '13px', color: '#283D42' }}>He is a <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#14829B' }}>{text}</span></span>
            </div>
        </div>
    )
}

export default BasicAnimationFunction