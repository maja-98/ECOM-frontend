import React from 'react'
import ItemList from '../features/items/ItemList'
import Banner from './Banner'

const Home = () => {
  return (
    <div className='home-container'>
        <Banner/>
        <ItemList filter={{category:'pardha',count:4}}/>
    </div>
  )
}

export default Home
