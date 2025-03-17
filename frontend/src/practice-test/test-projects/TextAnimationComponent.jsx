import React, { useEffect, useState } from 'react'

const TextAnimationComponent = () => {
    const [title, setTitle] = useState('Full Stack Developer.');

    useEffect(() => {
        const animatedTitle = setInterval(() => {
            setTitle('Professional Coder.');
            setTimeout(() => {
                setTitle('Full Stack Developer.');
            }, 2000);
        }, 4000);

        return () => clearInterval(animatedTitle);
    }, []);

    return (
        <div style={{ marginBottom: '16px' }}>
            <h5 style={{ color: '#0048A1' }}>Text Animation</h5>
            <div>
                <span style={{ fontSize: '13px', color: '#0048A1' }}>He is a <span style={{ fontWeight: 'bold' }}>{title}</span></span>
            </div>
        </div>
    )
}

export default TextAnimationComponent