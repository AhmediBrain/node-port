import React, { useEffect, useState } from 'react'

const BasicAnimationFunction = () => {
    const [text, setText] = useState('Full Stack Developer.');

    useEffect(() => {
        const animationText = setInterval(() => {
            setText('Professional Coder.');
            setTimeout(() => {
                setText('Full Stack Developer.');
            }, 2000);
        }, 4000);

        return () => clearInterval(animationText);
    }, []);

    return (
        <div style={{ marginBottom: '10px' }}>
            <h5>Text Animation</h5>
            <div>
                <label>He is a <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#14829B' }}>{text}</span></label>
            </div>
        </div>
    )
}

export default BasicAnimationFunction