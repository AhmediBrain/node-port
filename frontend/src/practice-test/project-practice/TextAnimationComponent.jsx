import React, { useEffect, useState } from 'react'

const TextAnimationComponent = () => {
    const [text, setText] = useState('Full Stack Developer.');

    useEffect(() => {
        const animatedText = setInterval(() => {
            setText('Professional Coder.');
            setTimeout(() => {
                setText('Full Stack Developer.');
            }, 2000);
        }, 4000);

        return () => clearInterval(animatedText);
    }, []);

    return (
        <div style={{ marginBottom: '10px' }}>
            <h5>Text Animation</h5>
            <div>
                <span style={{ fontSize: '13px', color: '#313131' }}>He is a <span style={{ color: '#23AAF2', fontWeight: 'bold' }}>{text}</span></span>
            </div>
        </div>
    )
}

export default TextAnimationComponent