import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faChevronDown, faChevronUp, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const [categoryListShow,setCategoryListShow] = useState(false)
  return (
    <div className='header-container container'>
      <h1 className='logo' onClick={()=>navigate('/')}>Dubai Pardhas</h1>
     
      <div className='categories-list-container'>
        <div onClick={()=>setCategoryListShow(prevState => !prevState)} className='flex-center-row pointer'>
          <h4>Categories</h4>
          {categoryListShow===false ? <FontAwesomeIcon  icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp}/>}
        </div>
        {categoryListShow && <div className='flex-center-column category-items'>
          <p>Pardha</p>
          <p>Maxi</p>
        </div>}
      </div>

      <h4  onClick={() => navigate('/orders')} className='pointer'>My Orders</h4>

      <div className='search-container'>
        
        <input  className='search-box' type={'text'} placeholder={'Search Product'}></input>
        <FontAwesomeIcon className='search-icon'  icon={faMagnifyingGlass} />
      </div>
  
      <div className='flex-center-row pointer'>
        <FontAwesomeIcon icon={faUser} size='lg' />
        <h4>Account</h4>
      </div>

      <div onClick={() => navigate('/cart')} className='flex-center-row pointer'>
        <FontAwesomeIcon icon={faCartShopping} size='lg' />
        <h4>Cart</h4>
      </div>
      


    </div>
  )
}

export default Header
