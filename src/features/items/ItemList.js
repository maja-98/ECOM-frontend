import { faCaretDown, faSpinner, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import {useGetItemsQuery} from './itemSlice'


const ItemList = () => {
  
  const {
    data:items,
    isLoading,
    isError,
    error
  } = useGetItemsQuery()
  
  const handleAddtoCart = (item) =>{
    console.log(item.itemname, 'Added to cart')
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
                    <button className='add-to-cart-button' onClick={() => handleAddtoCart(item)}>Add to Cart</button>
                  </div>
                  
                </div>
              </div>
            )
          }
          )}
        </div>
      </>
    )

  }
  return content
}

export default ItemList
