import {  faCartPlus, faEye, faSpinner, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect,  useState } from 'react'
import { useSelector } from 'react-redux';
import PopUp from '../../components/PopUp';
import useAuth from '../../hooks/useAuth';
import { useUpdateCartMutation } from '../cart/cartSlice';
import ItemFilter from './ItemFilter';
import { selectSearchCategory, selectSearchValue,selectSearchColor, selectSearchPrice, selectSort } from './itemSearchSlice';
import {useGetItemsQuery} from './itemSlice'
import SingleItem from './SingleItem';




const ItemList = () => {
  const {username:user} = useAuth()
  const [popup,setPopUp] = useState(false)
  const [message,setMessage] = useState('This is a Test Message')
  const [heading,setHeading] = useState('This is Heading')
  const [viewSingleItem,setViewSingleItem] = useState({view:false,itemId:''})
  const [items,setItems] = useState([])
  const searchValue = useSelector(selectSearchValue)
  const searchCategory = useSelector(selectSearchCategory)
  const searchColor = useSelector(selectSearchColor)
  const searchPrice = useSelector(selectSearchPrice)
  const sort = useSelector(selectSort)

  const handleTogglePopUp = () =>{
    setPopUp((prevState) => !prevState)
  }
  const handlePopUpContent = (message,heading) => {
      setHeading(heading)
      setMessage(message)
  }
  const {
    data:InitalItems,
    isLoading,
    isError,
    error
  } = useGetItemsQuery()
  const [updateCart] = useUpdateCartMutation()
  const handleViewItem = (itemId) =>{
      if (viewSingleItem.view){
        setViewSingleItem(prev=>{return {...prev,view:false}})
      }
      else{
        setViewSingleItem(prev=>{return {itemId,view:true}})
      }
  }
  
  useEffect(()=>{
    const filterColor = (item) => searchColor.length ?  item.colors.filter(color => searchColor.includes(color)).some(Boolean): true
    const filterPrice = (item) => searchPrice.length ? searchPrice.map(price=>item.price<price && item.price>price-500).some(Boolean):true
    const filterCategory = (item) => searchCategory ? item.category===searchCategory : true
    const filterValue = (item) => searchValue ? item.itemname.toLowerCase().match(searchValue.toLowerCase()) : true  
    if (InitalItems ){
      let newItems = InitalItems.filter(item => filterColor(item) && filterPrice(item) && filterCategory(item) && filterValue(item))
      if (sort==='PriceUp'){
        newItems.sort((a,b)=> a.price-b.price)
      }
      else if (sort === 'PriceDown'){
        newItems.sort((a,b)=> -a.price+b.price)
      }
      setItems(newItems)
    }


  },[searchValue,InitalItems,searchCategory,searchColor,searchPrice,sort])
  const handleAddtoCart = async(itemId,user) =>{
    const result = await updateCart({username:user,itemId})
   
    if (result?.data?.message!==undefined){
        handlePopUpContent('Item Added to Cart','Success')
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
        <ItemFilter/>
        <div className='item-list-container' >
          {items?.map( (item) => {
            return (
              <div key={item._id} className='item-container flex-center-column' >
                <div className='item-image-container'>
                  <img  className='item-image' src={item.images[0]} alt='Not Loaded'></img>
                
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
                    <button className='add-to-cart-button' onClick={() => handleViewItem(item.itemId)}>
                      <p className='sm-none'>View Item</p> 
                      <p className='lg-none'><FontAwesomeIcon  size='2x' icon={faEye}/></p>
                    </button>
                    {item.inventory && <button className='add-to-cart-button' onClick={() => handleAddtoCart(item.itemId,user)}>
                      <p className='sm-none'>Add to Cart</p> 
                      <p className='lg-none'><FontAwesomeIcon  size='2x' icon={faCartPlus}/></p>
                    </button>}
                  </div>
                  
                </div>
              </div>
            )
          }
          )}
        </div>
        {popup && <PopUp  message={message} heading={heading} handleTogglePopUp={handleTogglePopUp}/>}
        {viewSingleItem.view && <SingleItem   itemId={viewSingleItem.itemId} handleViewItem={handleViewItem}/>}
      </>
    )

  }
  return content
}

export default ItemList
