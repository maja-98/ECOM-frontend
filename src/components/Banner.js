import React from 'react'
import BannerImage from '../images/Banner.jpg'

const Banner = () => {
  return (
    <div className='banner-container'>
      <img className='banner-image' src={BannerImage} alt='not loaded'></img>
    </div>
  )
}

export default Banner
