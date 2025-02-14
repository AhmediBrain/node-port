import React, { useState } from 'react'

const BasicToDoComponent = () => {
    const [text, setText] = useState('');
    const [listStored, setlistStored] = useState([]);
    const [listId, setListId] = useState(null);
    const [listText, setListText] = useState('');

    const handleToDoChange = (e) => {
        setText(e.target.value);
    }

    const handleAddList = () => {
        if(!text.trim()) {
            alert('Please add some list.');
            return;
        } 
        else {
            const newText = { id: Date.now(), list: text.trim() };
            setlistStored([ ...listStored, newText ]);
            setText('');
        }
    }

    const handleDeleteList = (id) => {
        const updatedList = listStored.filter((item) => item.id !== id);
        setlistStored(updatedList);
    }

    const handleEditList = (id, currentList) => {
        setListId(id);
        setListText(currentList);
    }

    const handleListTextChange = (e) => {
        setListText(e.target.value);
    }

    const handleSaveList = (id) => {
        const savedList = listStored.map(
            (item) => 
                item.id === id ? { ...item, list: listText } : item
        );

        setlistStored(savedList);
        setListId(null);
    }

    return (
        <div style={{ backgroundColor: '#e5f4f8',  padding: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#03566d' }}>To Do Functions</span>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginTop: '10px' }}>
                <input 
                    style={{ padding: '5px 7px', width: '50%', border: '1px solid #b4e8f7', outline: 'none' }} 
                    type='text' 
                    value={text} 
                    onChange={handleToDoChange} />
                <button 
                    style={{ border: '1px solid #27a3c5', borderRadius: '4px', backgroundColor: '#FFFFFF', color: '#03566d', fontWeight: 'bold', cursor: 'pointer' }} 
                    onClick={handleAddList}>
                    Add List
                </button>
            </div>
            <div style={{ marginTop: '10px' }}>
                {listStored.map((item) => {
                    return (
                        <div key={item.id} 
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2%', border: '1px solid #27a3c5', padding: '8px', marginBottom: '10px' }}>
                            {listId === item.id ? (
                                <input 
                                    type='text' 
                                    style={{ border: 'solid 1px #b4e8f7', padding: '5px 7px', width: '100%' }} 
                                    value={listText} 
                                    onChange={handleListTextChange} />
                            ) : (
                                <span style={{ fontSize: '15px', color: '#03566d' }}>
                                    {item.list}
                                </span>
                            )}
                            <button 
                                style={{ border: '1px solid #E96725', padding: '3px', borderRadius: '4px', background: 'transparent', fontWeight: 'bold', color: '#E96725', cursor: 'pointer' }} 
                                onClick={() => handleDeleteList(item.id)}>
                                Delete
                            </button>
                            {listId === item.id ? (
                                <button 
                                    style={{ border: '1px solid #289947', borderRadius: '4px', color: '#289947', padding: '3px', fontWeight: 'bold', cursor: 'pointer' }} 
                                    onClick={() => handleSaveList(item.id)}>
                                    Save
                                </button>
                            ) : (
                                <button 
                                    style={{ border: '1px solid #27a3c5', padding: '3px', borderRadius: '4px', color: '#03566d', fontWeight: 'bold', cursor: 'pointer' }} 
                                    onClick={() => handleEditList(item.id, item.list)}>
                                    Edit
                                </button>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default BasicToDoComponent