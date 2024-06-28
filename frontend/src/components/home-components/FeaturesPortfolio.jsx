import React from 'react'
import TvOffIcon from '@mui/icons-material/TvOff';
import LanguageIcon from '@mui/icons-material/Language';
import GridViewIcon from '@mui/icons-material/GridView';
import { Link } from 'react-router-dom';

const FeaturesPortfolio = () => {
  return (
    <div className='home_container'>
        <div className='feature_headers'>
            <span>FEATURES</span>
            <p>What I Do</p>
        </div>
        <div className='home_flexibility'>
            <div className='feature_containers'>
                <div>
                    <TvOffIcon 
                        sx={{ fontSize: '50px', color: '#ff014f'}} />
                </div>
                <div>
                    <span>App Development</span>
                </div>
                <div>
                    <p>In the dynamic world of technology, app development stands at the forefront, transforming 
                        innovative ideas into functional, user-centric applications. My app development portfolio 
                        showcases a range of projects that highlight my expertise in designing, developing, and 
                        deploying mobile and web applications across various platforms.
                    </p>
                </div>
            </div>
            <div className='feature_containers'>
                <div>
                    <LanguageIcon
                        sx={{ fontSize: '50px', color: '#ff014f'}} />
                </div>
                <div>
                    <span>Web Development</span>
                </div>
                <div>
                    <p>In the ever-evolving digital landscape, web development plays a pivotal role in creating 
                        compelling online experiences. My web development portfolio demonstrates my proficiency 
                        in building responsive, high-performance websites and web applications. Through innovative 
                        design and cutting-edge technologies, I strive to deliver solutions that meet clients needs 
                        and enhance user engagement.
                    </p>
                </div>
            </div>
            <div className='feature_containers'>
                <div>
                    <GridViewIcon 
                        sx={{ fontSize: '50px', color: '#ff014f'}} />
                </div>
                <div>
                    <span>My Projects</span>
                </div>
                <div>
                    <ul>
                        <li>
                            <Link to='/login' 
                                target='_blank' 
                                rel='noopener noreferrer'>
                                Dashboard
                            </Link>
                        </li>
                        <li></li>
                        <li></li>
                    </ul>
                    <p>In the dynamic world of technology, app development stands at the forefront, transforming 
                        innovative ideas into functional, user-centric applications. My app development portfolio 
                        showcases a range of projects that highlight my expertise in designing, developing, and 
                        deploying mobile and web applications across various platforms.
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FeaturesPortfolio