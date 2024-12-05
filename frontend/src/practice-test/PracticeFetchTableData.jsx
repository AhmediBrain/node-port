import React, { useEffect, useState } from 'react'

const PracticeFetchTableData = () => {
    const [todos, setTodos] = useState([]);
    const [newUser, setNewUser] = useState(
        {
            userId: '',
            id: '',
            title: '',
            completed: ''
        }
    )

    useEffect(() => {
        const fetchTodosData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos');
                const data = await response.json();
                console.log('Data:', data.slice(0, 10));
                setTodos(data.slice(0, 10));
            } catch(err) {
                console.error(err);
            }
        }

        fetchTodosData();
    }, []);

    const handleDeleteRow = (userID) => {
        console.log('Deleted ID#', userID);
        const deleteRow = todos.filter((item) => item.id !== userID);
        setTodos(deleteRow);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
        console.log(`Name: ${name}, Value: ${value}`);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '16px' }}>
            <div style={{ display: 'flex' }}>
                <h5>Fetch Table Data</h5>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '25%', gap: '10px' }}>
                <fieldset>
                    <legend style={{ textAlign: 'left', fontSize: '13px' }}>User ID</legend>
                    <input type='number' 
                        style={{ width: '90%', padding: '5px', border: 'none', outline: 'none' }} 
                        name='userId' 
                        value={newUser.userId || ''} 
                        onChange={handleInputChange} />
                </fieldset>
                <fieldset>
                    <legend style={{ textAlign: 'left', fontSize: '13px' }}>ID</legend>
                    <input type='number' 
                        style={{ width: '90%', padding: '5px', border: 'none', outline: 'none' }} 
                        name='id' 
                        value={newUser.id || ''} 
                        onChange={handleInputChange} />
                </fieldset>
                <fieldset>
                    <legend style={{ textAlign: 'left', fontSize: '13px' }}>Title</legend>
                    <input type='text' 
                        style={{ width: '90%', padding: '5px', border: 'none', outline: 'none' }} 
                        name='title' 
                        value={newUser.title || ''} 
                        onChange={handleInputChange} />
                </fieldset>
                <fieldset>
                    <legend style={{ textAlign: 'left', fontSize: '13px' }}>Completed</legend>
                    <input type='text' 
                        style={{ width: '90%', padding: '5px', border: 'none', outline: 'none' }} 
                        name='completed' 
                        value={newUser.completed} 
                        onChange={handleInputChange} />
                </fieldset>
                <button style={{ 
                    backgroundColor: '#1C90ED',
                    border: '1px solid #0E5FFF',
                    color: '#FFFFFF',
                    padding: '8px',
                    borderRadius: '6px',
                    cursor: 'pointer'
                }}>
                    Add User
                </button>
            </div>
            <div style={{ display: 'flex', marginTop: '16px' }}>
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Completed</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {todos.map((todo) => {
                            //console.log('Todo:', todo);
                            return(
                                <tr key={todo.id}>
                                    <td>{todo.userId}</td>
                                    <td>{todo.id}</td>
                                    <td>{todo.title}</td>
                                    <td>{todo.completed === false ? 'No' : 'Yes'}</td>
                                    <td>
                                        <button style={{ border: 'none', cursor: 'pointer' }} 
                                            onClick={() => handleDeleteRow(todo.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PracticeFetchTableData