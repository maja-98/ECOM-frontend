import { faAngleDoubleLeft, faAngleDoubleRight, faSpinner, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import PopUp from '../../components/PopUp';
import useAuth from '../../hooks/useAuth';
import { useUpdateCartMutation } from '../cart/cartSlice';
import { useGetItemsbyItemIdQuery } from './itemSlice'

const SingleItem = ({itemId,handleViewItem}) => {
    const {data:item,isLoading,isError,error}= useGetItemsbyItemIdQuery({itemId})
    const [displayImages,setDisplayImages] = useState([])
    const [start,setStart] = useState(0)
    const [end,setEnd] = useState(3)
    const [mainImage,setMainImage] = useState('')
    const [popup,setPopUp] = useState(false)
    const [message,setMessage] = useState('')
    const [heading,setHeading] = useState('')
    const {username} = useAuth()
    const handleTogglePopUp = () =>{
      setPopUp((prevState) => !prevState)
    }
    const handlePopUpContent = (message,heading) => {
        setHeading(heading)
        setMessage(message)
    }
    const handleAddtoCart = async(itemId,user) =>{
      const result = await updateCart({username:user,itemId})
    
      if (result?.data?.message!==undefined){
          handlePopUpContent('Item Added to Cart','Success')
          handleTogglePopUp()
      }
      else{
         handlePopUpContent('Item Not added to cart','Failed')
          handleTogglePopUp()
      }
    }
    const [updateCart] = useUpdateCartMutation()
    useEffect(()=>{
      if (item){
        setDisplayImages(item.images.slice(0,3))
        setMainImage(item.images[0])
      }
    },[item])
    const handleArrowClick = (direction) =>{
      let newArray;
      let newStart 
      let newEnd
      if (direction==='left'){
        newStart = start - 1<0 ? item.images.length : start-1 
        newEnd = end-1<0 ? item.images.length : end-1 
      }
      else {
        newStart = start + 1>item.images.length ? 0 : start+1 
        newEnd = end+1>item.images.length ? 0 : end+1 
      }
      if (newStart>newEnd){
        newArray = item.images.slice(newEnd,newStart)
      }
      else{
        newArray = item.images.slice(newStart,newEnd)
      }
      setStart(newStart)
      setEnd(newEnd)
      setDisplayImages(newArray)
    }
    let content;
    if (isLoading){
    content = (
    <div className='single-item-overlay '>
        <div className='flex-center-column'>
          <FontAwesomeIcon icon={faSpinner} spin size='3x'/>
          <p>Loading...</p>
        </div>
      </div>
    )
    }
    else if (isError){
    content = (
    <div className='single-item-overlay'>
        <div className='flex-center-column'>
          <FontAwesomeIcon icon={faTriangleExclamation}  size='3x'/>
          <p>Error</p>
          <p>{error}</p>
        </div>
      </div>
    )
    }
  else{
    content =     <div className='single-item-overlay'>
        <div className='item-images-container flex-center-column'>
          <div className='main-image-container'>
            <img src={mainImage} alt='...'></img>
          </div>
          <div className='all-images-container'>
            {item.images.length>3 &&<FontAwesomeIcon icon={faAngleDoubleLeft} onClick={()=>handleArrowClick('left')} className='arrow-icons'/>}
            {displayImages.map((image)=>{
              return <img key={image} src={image} onClick={()=>setMainImage(image)} alt='...'></img>
            })}
             {item.images.length>3 &&<FontAwesomeIcon icon={faAngleDoubleRight} onClick={()=>handleArrowClick('right')} className='arrow-icons'/>}
          </div>
        </div>
        <div className='item-details-container flex-center-column'>
          <div className='item-details'>
            <p className='brand'>{item.brand}</p>
            <h1 className='title'>{item.itemname}</h1>
            <p className='price'>{item.price} ₹</p>
            <p className='properties'>Category: {item.category}</p>
            <p className='properties'>Size: {item.sizes[0]}</p>
            <p className='properties'>Color: {item.colors[0]}</p>
            
          </div>
            <div className='single-itempage-buttons'>
              <button onClick={()=>handleAddtoCart(item.itemId,username)}>Add to Cart</button>
              <button onClick={handleViewItem}>View All Items</button>
            </div>

        </div>
    </div>
  }
  return (
    <>
    {content}
    {popup && <PopUp  message={message} heading={heading} handleTogglePopUp={handleTogglePopUp}/>}
    </>
    
  )
}

export default SingleItem
