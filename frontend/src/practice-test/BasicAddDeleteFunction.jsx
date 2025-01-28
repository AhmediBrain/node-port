import React, { useState } from 'react'

const BasicAddDeleteFunction = () => {
    const [text, setText] = useState('');
    const [stored, setStored] = useState([]);

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleAddText = () => {
        if(!text.trim()) {
            alert('Please add some text.');
            return;
        } 
        else {
            const newText = { id: Date.now(), text: text.trim() };
            setStored([ ...stored, newText ]);
            setText('');
        }
    }

    const handleDeleteText = (id) => {
        const updatedText = stored.filter((item) => item.id !== id);
        setStored(updatedText);
    }

    return (
        <div style={{ marginBottom: '16px' }}>
            <h5>Basic Functions</h5>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2%' }}>
                    <input 
                        type='text' 
                        value={text} 
                        onChange={handleTextChange} 
                        style={{ padding: '3px 5px' }} />
                    <button 
                        onClick={handleAddText}>
                        Add Text
                    </button>
                </div>
            </div>
            <div style={{ marginTop: '10px' }}>
                {stored.map((item) => {
                    return (
                        <div key={item.id} 
                            style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
                            <span>{item.text}</span>
                            <button 
                                onClick={() => handleDeleteText(item.id)}>
                                Delete
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default BasicAddDeleteFunction