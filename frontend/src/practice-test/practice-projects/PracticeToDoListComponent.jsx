import React, { useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';

const PracticeToDoListComponent = () => {
    const [toDo, setToDo] = useState('');
    const [items, setItems] = useState([]);
    const [editID, setEditID] = useState(null);
    const [editList, setEditList] = useState('');

    const handleAddTodo = () => {
        if(!toDo.trim()) {
            alert('Please add some list.');
        } 
        else {
            const itemID = Date.now();
            setItems([
                ...items,
                { list: toDo.trim(), id: itemID }
            ]);
        }

        setToDo('');
    }

    console.log('Items:', items);

    const handleDeleteList = (id) => {
        const updatedList = items.filter((item) => item.id !== id);
        setItems(updatedList);
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
        <div style={{ padding: '0px 10px' }}>
            <h5 style={{ margin: '0px', color: '#8eb6cc' }}>To Do List</h5>
            <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                margin: '10px 0px',
                gap: '2%' 
            }}>
                <input 
                    type='text' 
                    name='todo' 
                    value={toDo} 
                    onChange={(e) => {
                        setToDo(e.target.value);
                        console.log('List Value:', e.target.value);
                    }} 
                    style={{ 
                        border: '1px solid #8eb6cc',
                        padding: '5px 8px',
                        borderRadius: '5px',
                        outline: 'none' 
                    }} />
                <button 
                    style={{ 
                        border: '2px solid #8eb6cc',
                        borderRadius: '5px',
                        color: '#8eb6cc',
                        fontWeight: 'bold',
                        background: 'transparent',
                        cursor: 'pointer'
                    }} 
                    onClick={handleAddTodo}>
                    Add List
                </button>
            </div>
            <div 
                style={{ border: '1px solid #8eb6cc', padding: '8px', marginBottom: '10px' }}>
                {items.map((item) => {
                    return (
                        <div key={item.id} 
                            style={{ 
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '8px',
                                border: '1px solid #91A30E',
                                marginBottom: '8px'
                            }}>
                            {editID === item.id ? (
                                <input 
                                    type='text' 
                                    value={editList} 
                                    onChange={(e) => {
                                        setEditList(e.target.value);
                                        console.log('Edit List:', e.target.value);
                                    }} 
                                    style={{
                                        border: '1px solid #8eb6cc',
                                        padding: '5px 8px',
                                        width: '90%',
                                        outline: 'none',
                                        borderRadius: '5px'
                                    }} />
                            ) : (
                                <span>{item.list}</span>
                            )}
                            <div style={{ display: 'flex', gap: '2%' }}>
                                <button style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                    onClick={() => handleDeleteList(item.id)}>
                                    <HighlightOffIcon 
                                        sx={{ color: '#C42B1C' }} 
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

export default PracticeToDoListComponent