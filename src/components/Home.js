import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const navigateToCategory = (category) => navigate('/items',{state:{filter:'category',value:category}})
  return (
    <div className='container home-container'>
      <div className='home-banner carousal'>
        <img className='home-banner-image'  src='https://picsum.photos/1000/100' alt='https://picsum.photos/300'></img>
      </div>
      <div className='home-images-container'>
        <div className='grid-row-3'>
          <div className='carousal'>
              <img className='home-image' onClick={()=>navigateToCategory('Maxi')} src='https://picsum.photos/200' alt='https://picsum.photos/300'></img>
          </div>
          <div className='carousal'>
              <img className='home-image' onClick={()=>navigateToCategory('Pardha')} src='https://picsum.photos/201' alt='https://picsum.photos/300'></img>
          </div>
          <div className='carousal'>
              <img className='home-image' onClick={()=>navigateToCategory('Shall')} src='https://picsum.photos/202' alt='https://picsum.photos/300'></img>
          </div>
        </div>
        <div className='grid-row-2'>
          <div className='carousal'>
              <img className='home-image' onClick={()=>navigateToCategory('Churidhar')} src='https://picsum.photos/203' alt='https://picsum.photos/300'></img>
          </div>
          <div className='carousal'>
              <img className='home-image' onClick={()=>navigateToCategory('Maftha')} src='https://picsum.photos/204' alt='https://picsum.photos/300'></img>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
