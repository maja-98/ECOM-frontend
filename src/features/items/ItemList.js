import { faCaretDown, faCartPlus, faSpinner, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import PopUp from '../../components/PopUp';
import useAuth from '../../hooks/useAuth';
import { useUpdateCartMutation } from '../cart/cartSlice';
import {useGetItemsQuery} from './itemSlice'




const ItemList = () => {
  const {username:user} = useAuth()
  const [popup,setPopUp] = useState(false)
  const [message,setMessage] = useState('This is a Test Message')
  const [heading,setHeading] = useState('This is Heading')
  const handleTogglePopUp = () =>{
    setPopUp((prevState) => !prevState)
  }
  const handlePopUpContent = (message,heading) => {
      setHeading(heading)
      setMessage(message)
  }
  const {
    data:items,
    isLoading,
    isError,
    error
  } = useGetItemsQuery()
  const [updateCart] = useUpdateCartMutation()
  
  const handleAddtoCart = async(itemId,user) =>{
    const result = await updateCart({username:user,itemId})
   
    if (result?.data?.message!==undefined){
        handlePopUpContent('notification','Item Added to Cart','')
        handleTogglePopUp()
    }
  }

  let content;
  if (isLoading){
   content = (
   <div className='no-item-container '>
      <div className='flex-center-column'>
        <FontAwesomeIcon icon={faSpinner} spin size='3x'/>
        <p>Loading...</p>
      </div>
    </div>
   )
  }
  else if (isError){
   content = (
   <div className='no-item-container '>
      <div className='flex-center-column'>
        <FontAwesomeIcon icon={faTriangleExclamation}  size='3x'/>
        <p>Error</p>
        <p>{error}</p>
      </div>
    </div>
   )
  }
  else{

    content = (
      <>
        <div className='filter-container'>
          <div className='filter-list'>
            <button className='filter-btn'>Category <FontAwesomeIcon icon={faCaretDown} size='sm'/></button>
            <button className='filter-btn'>Color <FontAwesomeIcon icon={faCaretDown} size='sm'/></button>
            <button className='filter-btn'>Price <FontAwesomeIcon icon={faCaretDown} size='sm'/></button>
          </div>
          <button className='filter-btn'>Sort <FontAwesomeIcon icon={faCaretDown} size='sm'/></button>
        </div>
        <div className='item-list-container'>
          {items.map( (item) => {
            return (
              <div key={item._id} className='item-container flex-center-column'>
                <div className='item-image-container'>
                  {item.images.map((image,i) => {
                    return <img key={i} className='item-image' src={image} alt='Not Loaded'></img>
                  })}
                </div>
                <div className='item-details-container'>
                  <div className='item-details'>
                    <div className='item-detail-header'>
                      <h5>{item.itemname}</h5>
                      <h6>{item.brand}</h6>
                    </div>
                    <p className='item-price'>₹{item.price} </p>
                  </div>
                  <div className='add-to-cart-container'>
                    <button className='add-to-cart-button' onClick={() => handleAddtoCart(item.itemId,user)}>
                      <p className='sm-none'>Add to Cart</p> 
                      <p className='lg-none'><FontAwesomeIcon  size='sm' icon={faCartPlus}/></p>
                    </button>
                  </div>
                  
                </div>
              </div>
            )
          }
          )}
        </div>
        {popup && <PopUp  message={message} heading={heading} handleTogglePopUp={handleTogglePopUp}/>}
      </>
    )

  }
  return content
}

export default ItemList
