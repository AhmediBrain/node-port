import React, { useState } from 'react';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';

const PracticeToDoListComponent = () => {
    const [text, setText] = useState('');
    const [items, setItems] = useState([]);
    const [editID, setEditID] = useState(null);
    const [editText, setEditText] = useState('');

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleAddList = () => {
        if(!text.trim()) {
            alert('Please add some list.');
            return
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

    const handleSaveList = (id) => {
        const savedValue = items.map(
            (item) => 
                item.id === id ? { ...item, list: editText } : item
        );

        setItems(savedValue);
        setEditID(null);
    }

    const handleEditList = (id, currentList) => {
        setEditID(id);
        setEditText(currentList);
    }

    return (
        <div style={{ backgroundColor: '#eff5f8', padding: '2px' }}>
            <h4 style={{ color: '#007ABB' }}>To Do List</h4>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginBottom: '16px' }}>
                <input 
                    style={{ border: '1px solid #aeddf7', outline: 'none', padding: '5px 8px' }} 
                    type='text' 
                    value={text} 
                    onChange={handleTextChange} />
                <button 
                    style={{ border: '2px solid #aeddf7', borderRadius: '5px', color: '#007ABB', fontWeight: 'bold', cursor: 'pointer' }} 
                    onClick={handleAddList}>
                    Add List
                </button>
            </div>
            <div style={{ padding: '5px 8px' }}>
                {items.map((item) => {
                    return (
                        <div key={item.id} 
                            style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px', border: '1px solid #54bbf3', marginBottom: '10px' }}>
                            {editID === item.id ? (
                                <input 
                                    type='text' 
                                    value={editText} 
                                    onChange={(e) => setEditText(e.target.value)} 
                                    style={{ border: '1px solid #aeddf7', outline: 'none', padding: '5px 8px', width: '75%' }} />
                            ) : (
                                <span>{item.list}</span>
                            )}
                            <div style={{ display: 'flex', gap: '5%' }}>
                                <button 
                                    style={{ border: 'none', background: 'transparent', padding: '0px', cursor: 'pointer' }} 
                                    onClick={() => handleDeleteList(item.id)}>
                                    <HighlightOffOutlinedIcon 
                                        sx={{ color: '#E08800' }} 
                                        titleAccess='Delete' />
                                </button>
                                {editID === item.id ? (
                                    <button 
                                        style={{ border: 'none', background: 'transparent', padding: '0px', cursor: 'pointer' }} 
                                        onClick={() => handleSaveList(item.id)}>
                                        <SaveOutlinedIcon 
                                            sx={{ color: '#289947' }} 
                                            titleAccess='Save' />
                                    </button>
                                ) : (
                                    <button 
                                        style={{ border: 'none', background: 'transparent', padding: '0px', cursor: 'pointer' }} 
                                        onClick={() => handleEditList(item.id, item.list)}>
                                        <AppRegistrationOutlinedIcon 
                                            sx={{ color: '#0079BA' }} 
                                            titleAccess='Edit' />
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

export default PracticeToDoListComponent