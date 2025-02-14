import React from 'react'
import ContactPortfolio from './ContactPortfolio'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import nodejs from '../../images/nodejs.webp'
import javascript from '../../images/javascript.webp'
import reactjs from '../../images/reactjs.webp'
import mypic from '../../images/mypic.jpg'

// Template: https://rainbowit.net/html/inbio/index-white-version.html

const HomePortfolio = () => {
    return (
        <div className='home_container'>
            <div className='home_flexibility'>
                <div className='flexibility_divider'>
                    <div style={{ padding: '25px' }}>
                        <div>
                            <p className='welcome_title'>WELCOME TO MY WORLD</p>
                        </div>
                        <div>
                            <p className='intro_title'>
                                Hi, I'm <span>Shamim Ahmed</span>
                            </p>
                            <ContactPortfolio />
                        </div>
                        <div className='intro_skill_container'>
                            <div className='intro_find_with'>
                                <div>
                                    <p className='social_skill_text'>FIND WITH ME</p>
                                </div>
                                <div className='intro_skill_container'>
                                    <div className='social_icons_container'>
                                        <LinkedInIcon 
                                            sx={{ color: "#0077B5", margin: "2px" }} 
                                            titleAccess='LinkedIn' />
                                    </div>
                                    <div className='social_icons_container'>
                                        <PermIdentityIcon 
                                            sx={{ color: "#60C4E0", margin: "2px" }} 
                                            titleAccess='Download Resume' />
                                    </div>
                                </div>
                            </div>
                            <div className='intro_find_with'>
                                <div>
                                    <p className='social_skill_text'>BEST SKILL ON</p>
                                </div>
                                <div className='intro_skill_container'>
                                    <div className='social_icons_container'>
                                        <img src={javascript} alt='javascript' className='skills_icon' />
                                    </div>
                                    <div className='social_icons_container'>
                                        <img src={reactjs} alt='reactjs' className='skills_icon' />
                                    </div>
                                    <div className='social_icons_container'>
                                        <img src={nodejs} alt='nodejs' className='skills_icon' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flexibility_divider'>
                    <div style={{ padding: '25px' }}>
                        <div className='intro_image_box'>
                            <img src={mypic} alt='mypic' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePortfolio