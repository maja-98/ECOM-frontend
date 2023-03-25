import React, {  useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faChevronDown, faChevronUp, faMagnifyingGlass, faRectangleList, faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import Login from './Login'
import useAuth from '../hooks/useAuth'
import {setSearch } from '../features/items/itemSearchSlice'
import { useDispatch } from 'react-redux'
import usePersist from '../hooks/usePersist'




const Header = () => {
  const [loginView,setloginView] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [categoryListShow,setCategoryListShow] = useState(false)
  const handleLoginView = ()=>setloginView(prevState=> !prevState)
  const handleSearch = (e) =>{
    dispatch(setSearch({searchValue:e.target.value}))
  }
  const [persist] = usePersist()
  const {username} = useAuth()
  useEffect(()=>{
    if (!persist){
      setloginView(true)
    }
    else{
      setloginView(false)
    }
  },[persist])
  return (
    <div className='header-container'>
      <h1 className='logo' onClick={()=>navigate('/')}>Men's Boutique</h1>
     
      <div className='categories-list-container sm-none'>
        <div onClick={()=>setCategoryListShow(prevState => !prevState)} className='flex-center-row pointer'>
          <h4 >Categories</h4>
          {categoryListShow===false ? <FontAwesomeIcon className='checron-icon'  icon={faChevronDown} /> : <FontAwesomeIcon className='checron-icon' icon={faChevronUp}/>}
        </div>
        {categoryListShow && <div className='flex-center-column category-items'>
          <p onClick={() => {navigate('/');dispatch(setSearch({searchCategory:''}))}}>All</p>
          <p onClick={() =>{navigate('/');dispatch(setSearch({searchCategory:'Shirt'}))}}>Shirt</p>
          <p onClick={() =>{navigate('/');dispatch(setSearch({searchCategory:'Pant'}))}}>Pant</p>
          <p onClick={() =>{navigate('/');dispatch(setSearch({searchCategory:'Cap'}))}}>Cap</p>
        </div>}
      </div>

      <h4  onClick={() => navigate('/orders')} className='pointer sm-none'>Orders</h4>

      <div className='search-container'>
        
        <input  className='search-box' type={'text'} onChange={handleSearch}  placeholder={'Search Product'}></input>
        <FontAwesomeIcon className='search-icon'  icon={faMagnifyingGlass} />
      </div>

      <div onClick={() => navigate('/orders')} className='flex-center-row pointer lg-none' >
        <FontAwesomeIcon icon={faRectangleList} size='lg' />
      </div>
  
      <div onClick={handleLoginView}  className='flex-center-row pointer'>
        <FontAwesomeIcon className='sm-none' icon={faUser} size='lg' />
        <h4 className='sm-none'>{username ? username:'Login'}</h4>
        <div className='username-mobile-icon lg-none'><h4>{username ? username.slice(0,2): <FontAwesomeIcon  icon={faUser} size='2x' />}</h4></div>
      </div>


      <div onClick={() => navigate('/cart')} className='flex-center-row pointer'>
        <FontAwesomeIcon icon={faCartShopping} size='lg' />
        <h4 className='sm-none'>Cart</h4>
      </div>
      
      {loginView && <Login handleLoginView={handleLoginView}/>}

    </div>
  )
}

export default Header
