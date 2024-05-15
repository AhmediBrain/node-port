import React from 'react'
import ContactPortfolio from './ContactPortfolio'
import mypic from '../../images/mypic.png'

// Template: https://preview.themeforest.net/item/inbio-one-page-personal-portfolio-template/full_screen_preview/33188244?_ga=2.88403864.248853679.1640051566-1973834915.1632625071

// #E3E9ED
// #F6F8F9

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
                    <div>
                        <div>
                            <p>FIND WITH ME</p>
                        </div>
                        <div>
                            <p>BEST SKILL ON</p>
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