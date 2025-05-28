import React, { useState } from 'react';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';

const ToDoListAddingApp = () => {
    const [addToDo, setAddToDo] = useState('');
    const [lists, setLists] = useState([]);
    const [editID, setEditID] = useState(null);
    const [editList, setEditList] = useState('');

    const handleAddList = () => {
        if(!addToDo.trim()) {
            alert('Please add some list.');
            return;
        } 
        else {
            const listID = Date.now();
            setLists([
                ...lists,
                { id: listID, list: addToDo.trim() }
            ])
        }

        setAddToDo('');
    }

    const handleDeleteList = (id) => {
        const updatedList = lists.filter((item) => item.id !== id);
        setLists(updatedList);
    }

    const handleSaveList = (id) => {
        const savedValue = lists.map(
            (item) => 
                item.id === id ? { ...item, list: editList } : item
        );

        setLists(savedValue);
        setEditID(null);
    }

    const handleEditList = (id, currentList) => {
        setEditID(id);
        setEditList(currentList);
    }

    return (
        <div style={{ background: 'linear-gradient(180deg,rgba(233, 248, 239, 1) 0%, rgba(255, 255, 255, 1) 100%' }}>
            <h5 style={{ color: '#223E3E', margin: '0px' }}>To Do List App</h5>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1%', margin: '16px 0px' }}>
                <input 
                    type='text' 
                    value={addToDo} 
                    onChange={(e) => setAddToDo(e.target.value)} 
                    style={{ border: '1px solid #969999', padding: '5px 8px', outline: 'none', borderRadius: '5px' }} />
                <button 
                    style={{ border: '2px solid #223E3E', borderRadius: '5px', color: '#223E3E', cursor: 'pointer' }} 
                    onClick={handleAddList}>
                    Add List
                </button>
            </div>

            <div style={{ border: '1px solid #969999', padding: '8px', margin: '8px' }}>
                {lists.map((item) => {
                    return (
                        <div key={item.id} 
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #90c7c7', padding: '8px', marginBottom: '10px' }}>
                            <span style={{ fontSize: '14px', color: '#283f3f' }}>
                                {editID === item.id ? (
                                    <input 
                                        type='text' 
                                        value={editList} 
                                        onChange={(e) => setEditList(e.target.value)} 
                                        style={{ border: '1px solid #969999', outline: 'none', borderRadius: '5px', padding: '5px 8px' }} />
                                ) : (
                                    <>{item.list}</>
                                )}
                            </span>
                            <div style={{ display: 'flex', gap: '2%' }}>
                                <button style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                    onClick={() => handleDeleteList(item.id)}>
                                    <HighlightOffOutlinedIcon 
                                        titleAccess='Delete' 
                                        sx={{ color: '#C42B1C' }} />
                                </button>
                                {editID === item.id ? (
                                    <button style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                        onClick={() => handleSaveList(item.id)}>
                                        <SaveOutlinedIcon 
                                            titleAccess='Save' 
                                            sx={{ color: '#13A10E' }} />
                                    </button>
                                ) : (
                                    <button style={{ background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer' }} 
                                        onClick={() => handleEditList(item.id, item.list)}>
                                        <AppRegistrationOutlinedIcon 
                                            titleAccess='Edit' 
                                            sx={{ color: '#0078B9' }} />
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