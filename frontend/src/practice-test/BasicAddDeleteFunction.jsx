import React, { useState } from 'react'

const BasicAddDeleteFunction = () => {
    const [text, setText] = useState('');
    const [added, setAdded] = useState([]);
    const [listId, setListId] = useState(null);
    const [listText, setListText] = useState('');

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleListTextChange = (e) => {
        setListText(e.target.value);
        console.log('List Text:', e.target.value);
    }

    const handleAddList = () => {
        if(!text.trim()) {
            alert('Please add some list.');
            return;
        } 
        else {
            const newList = { id: Date.now(), list: text.trim() };
            setAdded([ ...added, newList ]);
            setText('');
        }
    }

    const handleDeleteList = (id) => {
        const updatedList = added.filter((item) => item.id !== id);
        setAdded(updatedList);
    }

    const handleEditList = (id, currentList) => {
        setListId(id);
        setListText(currentList);
    }

    const handleSaveList = (id) => {
        setAdded(
            added.map((item) => 
                item.id === id ? { ...item, list: listText } : item
            )
        );
        
        setListId(null);
    }

    return (
        <div style={{ marginBottom: '10px', backgroundColor: '#e2f0f8', paddingBottom: '8px' }}>
            <h5 style={{ paddingTop: '8px' , color: '#969494' }}>Basic Add, Delete, Edit And Save Functions</h5>
            <div>
                <span style={{ color: '#0077B5', fontSize: '13px', fontWeight: 'bold' }}>To Do List</span>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1%', margin: '8px 5px' }}>
                    <input 
                        type='text' 
                        style={{ width: '50%', padding: '5px', border: '1px solid #8ad2f8', outline: 'none' }} 
                        value={text} 
                        onChange={handleTextChange} />
                    <button 
                        style={{ border: '1px solid #8ad2f8', borderRadius: '4px', backgroundColor: '#FFFFFF', color: '#0077B5', fontWeight: 'bold', cursor: 'pointer' }} 
                        onClick={handleAddList}>
                        Add List
                    </button>
                </div>
            </div>
            <div style={{ padding: '8px' }}>
                {added.map((item) => {
                    return (
                        <div key={item.id} 
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2%', border: '1px solid #8ad2f8', padding: '8px', marginBottom: '10px' }}>
                            {listId === item.id ? (
                                <input 
                                    type='text' 
                                    value={listText} 
                                    onChange={handleListTextChange} 
                                    style={{ width: '100%', padding: '5px', border: '1px solid #8ad2f8', outline: 'none' }} />
                            ) : (
                                <span style={{ fontSize: '13px', color: '#4D4D4D' }}>{item.list}</span>
                            )}
                            <button style={{ border: '1px solid #E96725', borderRadius: '4px', backgroundColor: '#FFFFFF', fontWeight: 'bold', color: '#E96725', padding: '5px', cursor: 'pointer' }} 
                                onClick={() => handleDeleteList(item.id)}>
                                Delete
                            </button>
                            {listId === item.id ? (
                                <button 
                                    style={{ border: '1px solid #13A10E', borderRadius: '4px', backgroundColor: '#FFFFFF', color: '#13A10E', fontWeight: 'bold', cursor: 'pointer', padding: '5px' }} 
                                    onClick={() => handleSaveList(item.id)}>
                                    Save
                                </button>
                            ) : (
                                <button 
                                    style={{ border: '1px solid #8ad2f8', borderRadius: '4px', backgroundColor: '#FFFFFF', color: '#0077B5', fontWeight: 'bold', cursor: 'pointer', padding: '5px' }} 
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

export default BasicAddDeleteFunction