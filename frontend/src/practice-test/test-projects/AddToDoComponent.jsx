import React, { useState } from 'react';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

const AddToDoComponent = () => {
    const [text, setText] = useState('');
    const [items, setItems] = useState([]);
    const [editID, setEditID] = useState(null);
    const [editText, setEditText] = useState('');
    // #2C3367

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleAddList = () => {
        if(!text.trim()) {
            alert('Please add some list.');
            return;
        } 
        else {
            const newList = { id: Date.now(), list: text.trim() };
            setItems([ ...items, newList ]);
        }

        setText('');
    }

    const handleDeleteList = (id) => {
        const updatedList = items.filter((item) => item.id !== id);
        setItems(updatedList);
    }

    const handleEditTextChange = (e) => {
        setEditText(e.target.value);
    }

    const handleEditList = (id, currentList) => {
        setEditID(id);
        setEditText(currentList);
    }

    const handleSaveList = (id) => {
        const editValue = items.map(
            (item) => 
                item.id === id ? { ...item, list: editText } : item
        );

        setItems(editValue);
        setEditID(null);
    }
    
    return (
        <div style={{ backgroundColor: '#e8eafa', padding: '8px' }}>
            <h5 style={{ color: '#394283' }}>Add To Do List</h5>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginBottom: '16px' }}>
                <input 
                    type='text' 
                    value={text} 
                    onChange={handleTextChange} 
                    style={{ border: '1px solid #a0abfa', outline: 'none', padding: '5px 8px' }} />
                <button 
                    style={{ border: '1px solid #6879fa', color: '#2C3367', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }} 
                    onClick={handleAddList}>
                    Add List
                </button>
            </div>

            <div>
                {items.map((item) => {
                    return (
                        <div key={item.id} 
                            style={{ 
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '5px 16px',
                                alignItems: 'center',
                                border: '1px solid #579fe2',
                                marginBottom: '10px' 
                            }}>
                            <div style={{ width: '70%', textAlign: 'left' }}>
                                {editID === item.id ? (
                                    <input 
                                        type='text' 
                                        value={editText} 
                                        onChange={handleEditTextChange} 
                                        style={{ border: '1px solid #a0abfa', outline: 'none', padding: '5px 8px', width: '100%', color: '#dd8705' }} />
                                ) : (
                                    <span style={{ fontSize: '14px', color: '#054b70' }}>{item.list}</span>
                                )}
                            </div>
                            <div style={{ display: 'flex', gap: '20%' }}>
                                <button 
                                    style={{ border: 'none', padding: '0px', cursor: 'pointer' }} 
                                    onClick={() => handleDeleteList(item.id)}>
                                    <HighlightOffOutlinedIcon 
                                        titleAccess='Delete' 
                                        style={{ color: '#C42B1C' }} />
                                </button>
                                {editID === item.id ? (
                                    <button 
                                        style={{ border: 'none', padding: '0px', cursor: 'pointer' }} 
                                        onClick={() => handleSaveList(item.id)}>
                                        <SaveOutlinedIcon 
                                            titleAccess='Save' 
                                            style={{ color: '#279847' }} />
                                    </button>
                                ) : (
                                    <button 
                                        style={{ border: 'none', padding: '0px', cursor: 'pointer' }} 
                                        onClick={() => handleEditList(item.id, item.list)}>
                                        <EditNoteOutlinedIcon 
                                            titleAccess='Edit' 
                                            style={{ color: '#007ABB', fontSize: '30px' }} />
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AddToDoComponent