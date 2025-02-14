import React, { useState } from 'react'

const EditComponentFunction = () => {
    const [textId, setTextId] = useState(null);
    const [updatedText, setUpdatedText] = useState('Cross-language. Use the Playwright API in TypeScript, JavaScript, Python, .NET, Java.');

    const handleTextChange = (e) => {
        setUpdatedText(e.target.value);
    }

    const handleEditText = () => {
        setTextId(1);
    }

    const handleSaveText = () => {
        setTextId(null);
    }

    return (
        <div>
            <h5>Edit And Save Functions</h5>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2%' }}>
                {textId ? (
                    <input 
                        style={{ width: '75%', padding: '5px' }} 
                        type='text' 
                        value={updatedText} 
                        onChange={handleTextChange} />
                ) : (
                    <span>{updatedText}</span>
                )}
                {textId ? (
                    <button onClick={handleSaveText}>Save</button>
                ) : (
                    <button onClick={handleEditText}>Edit</button>
                )}
            </div>
        </div>
    )
}

export default EditComponentFunction