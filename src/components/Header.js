import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className='header-container container'>
      <h1 className='logo' onClick={()=>navigate('/')}>Dubai Palace</h1>
      <div className='header-right-subcontainer flex-center-row '>
        <nav className='nav-links flex-center-row '>
          <h4>Signup</h4>
          <h4>Login</h4>
        </nav>
        <div className='cart '>
          <h1 className='cart-btn' onClick={()=>navigate('/cart')}><FontAwesomeIcon icon={faCartShopping} /></h1>
        </div>
      </div>
    </div>
  )
}

export default Header
