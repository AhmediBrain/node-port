import React from 'react'

const StudentPushInRequest = () => {
    // const
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div>
                    <h4>Schedule a Student Push-In Request</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginBottom: '10px' }}>
                        <label style={{ textAlign: 'left' }}>Student Name</label>
                        <input type='text' />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginBottom: '10px' }}>
                        <label>Department</label>
                        <select>
                            <option>Occupational Therapy</option>
                            <option>Physical Therapy</option>
                            <option>Speech Language Therapy</option>
                            <option>Music Therapy</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginBottom: '10px' }}>
                        <label style={{ textAlign: 'left' }}>Select Date</label>
                        <input 
                            type='date' />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2%', marginBottom: '10px' }}>
                        <label>Time Range</label>
                        <input 
                            type='time' />
                    </div>
                    <div>
                        <button>Schedule Push-In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentPushInRequest