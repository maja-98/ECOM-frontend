import {Outlet} from 'react-router-dom'
import React from 'react'
import Header from './Header'
import Footer from './Footer'

const LayOut = () => {
  return (
    <>
        <Header/>
        <Outlet/>
        <div className='footer'>
          <Footer/>
        </div>
        
    </>
        
  )
}

export default LayOut
