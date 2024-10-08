import React, { useState } from 'react'
import './reportStyles.css';
import { categories } from './categoriesData';

const QuarterlyProgressReport = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryClick = (formattedCategoryKey) => {
        setSelectedCategory(formattedCategoryKey);

        const sectionElement = document.getElementById(formattedCategoryKey);

        if(sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth' })
        }
    }

    // const handleInputChange = (e, categoryKey) => {
    //     const newValue = e.target.value;
    // }

    return (
        <div>
            <div className='sidebar'>
                {Object.keys(categories).map((key, index) => {
                    const formattedCategory = String(index + 1).padStart(2, '0');
                    
                    return(
                        <div key={formattedCategory} 
                            onClick={() => handleCategoryClick(formattedCategory)}>
                            <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#0000FF', marginRight: '5px' }}>{formattedCategory}</span>
                            <span style={{ 
                                backgroundColor: '#198754', 
                                padding: '2px 4px', 
                                fontSize: '10px', 
                                color: 'white'
                            }}>{categories[key][0]?.service_type}</span>
                        </div>
                    )
                })}
            </div>
            <div className='table_content'>
                <table style={{ overflowX: 'auto' }}>
                    {Object.keys(categories).map((key, index) => {
                        const formattedCategoryKey = String(index + 1).padStart(2, '0');
                        console.log('Goal Type:', categories[key][0]?.goal_type);
                        return(
                            <tbody key={formattedCategoryKey} id={formattedCategoryKey}>
                                <tr>
                                    <td 
                                        className={selectedCategory === formattedCategoryKey ? 'selected' : ''} 
                                        colSpan={3} 
                                        style={{ backgroundColor: '#1973fc', color: '#f1f3f7' }}>
                                        {categories[key][0]?.service_type}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} 
                                        style={{ backgroundColor: '#D3D3D3' }}>
                                        Annual Goal
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3}>
                                        <div style={{ 
                                            padding: '2px 5px',
                                            border: '1px solid #CED4DA',
                                            backgroundColor: '#e5fcfc'
                                        }}>
                                            {categories[key].find(item => item.goal_type === "G")?.iep_goal || ''}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} 
                                        style={{ backgroundColor: '#D3D3D3' }}>
                                        Objectives/Benchmarks
                                    </td>
                                </tr>
                                {categories[key].map((objective, index) => {
                                    return(
                                        <React.Fragment key={index}>
                                            <tr>
                                                <td>
                                                    <p style={{ fontSize: '14px', fontWeight: 'bold' }}>Benchmark {index + 1}</p>
                                                </td>
                                                <td>
                                                    <div style={{ 
                                                        padding: '2px 5px',
                                                        border: '1px solid #CED4DA',
                                                        backgroundColor: '#e5fcfc',
                                                        borderRadius: '5px'
                                                    }}>
                                                        {objective.iep_goal}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span>
                                                        <select style={{ 
                                                            padding: '3px 2px',
                                                            marginBottom: '6px'
                                                        }}>
                                                            <option disabled>Please select: (Level)</option>
                                                            <option>Not yet intorduced</option>
                                                            <option>Discontinue</option>
                                                            <option>Newly introduced/low proficiency</option>
                                                            <option>Inconsistent progress</option>
                                                            <option>Emerging</option>
                                                            <option>Achieved</option>
                                                        </select>
                                                    </span>
                                                    <br />
                                                    <span><b>Last:</b></span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ backgroundColor: '#D3D3D3' }}>
                                                    Plan Modification
                                                </td>
                                                <td colSpan={2} 
                                                    style={{ backgroundColor: '#D3D3D3' }}>
                                                    <div>
                                                        <div style={{ marginBottom: '8px' }}>
                                                            <select style={{ 
                                                                padding: '3px 2px'
                                                            }}>
                                                                <option>Please select: (default comment)</option>
                                                                <option>Student is progressing as expected and on track to meet short term</option>
                                                                <option>Goal will be addressed pending attainment of prior goal.</option>
                                                                <option>Anticipate meeting goal.</option>
                                                                <option>Not yet introduced.</option>
                                                                <option>Goal could not be addressed.</option>
                                                                <option>No progress demonstrated.</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <textarea rows='5'
                                                                type='text' 
                                                                disabled
                                                                style={{ padding: '3px', width: '85%' }} 
                                                                value={objective.goal_comments}
                                                                // onChange={(e) => handleInputChange(e, categoryKey)} 
                                                                />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    )
                                })}
                                <tr>
                                    <td colSpan={3} style={{ borderBottom: '2px solid #000000' }}></td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}

export default QuarterlyProgressReport