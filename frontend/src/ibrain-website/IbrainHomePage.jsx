import React, { useState } from 'react'
import '../quarterly-progress/reportStyles.css';
import { navbarData } from './navbarData';

const IbrainHomePage = () => {
    const [activeSection, setActiveSection] = useState(null);

    const handleMouseEnter = (index) => {
        setActiveSection(index);
    }

    const handleMouseLeave = () => {
        setActiveSection(null);
    }

    return (
        <nav className='site-navbar'>
            <div className='site-navbar-container'>
                <div className='site-navbar-logo'>
                    <img src={navbarData.logo.src} alt={navbarData.logo.alt} />
                </div>

                <ul className='site-navbar-sections'>
                    {navbarData.sections.map((section, index) => (
                        <li 
                            key={index} 
                            className={`site-navbar-section ${activeSection === index ? 'active' : ''}`} 
                            onMouseEnter={() => handleMouseEnter(index)} 
                            onMouseLeave={handleMouseLeave}>
                            <a href={section.subsections ? ' # ' : section.link}>
                                {section.title}
                            </a>
                            {section.subsections && (
                                <ul className='site-navbar-subsections'>
                                    {section.subsections.map((subsection, subIndex) => (
                                        <li key={subIndex} className='site-navbar-subsection'>
                                            <a href={subsection.link}>
                                                {subsection.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default IbrainHomePage