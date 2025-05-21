import React, { useState } from 'react';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';

const ToDoListAddingApp = () => {
    const [addTodo, setAddTodo] = useState('');
    const [items, setItems] = useState([]);
    const [editID, setEditID] = useState(null);
    const [editList, setEditList] = useState('');

    const handleAddList = () => {
        if(!addTodo.trim()) {
            alert('Please enter some list.');
            return;
        } 
        else {
            const todoID = Date.now();
            setItems([
                ...items,
                { id: todoID, list: addTodo.trim() }
            ]);
        }

        setAddTodo('');
    }

    const handleDeleteList = (id) => {
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
    }

    const handleSaveList = (id) => {
        const savedValue = items.map(
            (item) => 
                item.id === id ? { ...item, list: editList } : item
        );

        setItems(savedValue);
        setEditID(null);
    }

    const handleEditList = (id, currentList) => {
        setEditID(id);
        setEditList(currentList);
    }

    return (
        <div>
            <h5 style={{ color: '#0078B9', margin: '0px' }}>Add To Do List</h5>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2%', margin: '10px' }}>
                <input 
                    type='text' 
                    style={{ border: '1px solid #b9c7d8', padding: '5px 8px', outline: 'none', color: '#113159' }} 
                    value={addTodo} 
                    onChange={(e) => {
                        setAddTodo(e.target.value);
                    }} />
                <button 
                    style={{ border: '2px solid #b9c7d8', borderRadius: '5px', background: 'transparent', color: '#113159', fontWeight: 'bold', cursor: 'pointer' }} 
                    onClick={handleAddList}>
                    Add List
                </button>
            </div>

            <div style={{ border: '1px solid #b9c7d8', margin: '10px', padding: '10px' }}>
                {items.map((item) => {
                    return (
                        <div key={item.id} 
                            style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid #0078B9', padding: '8px', marginBottom: '8px'}}>
                            {editID === item.id ? (
                                <input type='text' 
                                    value={editList} 
                                    onChange={(e) => {
                                        setEditList(e.target.value);
                                        console.log('Edit Value:', e.target.value);
                                    }} 
                                    style={{ border: '1px solid #b9c7d8', padding: '5px 8px', outline: 'none', width: '75%', color: '#113159', fontSize: '13px' }} />
                            ) : (
                                <span style={{ color: '#113159', fontSize: '13px' }}>{item.list}</span>
                            )}
                            <div style={{ display: 'flex', gap: '5%' }}>
                                <button style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                    onClick={() => handleDeleteList(item.id)}>
                                    <HighlightOffOutlinedIcon 
                                        sx={{ color: '#E96725' }} 
                                        titleAccess='Delete' />
                                </button>
                                {editID === item.id ? (
                                    <button style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                        onClick={() => handleSaveList(item.id)}>
                                        <SaveOutlinedIcon 
                                            sx={{ color: '#13A10E' }} 
                                            titleAccess='Save' />
                                    </button>
                                ) : (
                                    <button style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                        onClick={() => handleEditList(item.id, item.list)}>
                                        <AppRegistrationOutlinedIcon 
                                            sx={{ color: '#0078B9' }} 
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

export default ToDoListAddingApp