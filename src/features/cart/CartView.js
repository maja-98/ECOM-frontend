import { faHourglass, faSadTear, faSpinner, faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useAddNewOrderMutation } from '../orders/orderSlice'
import { useGetUserbyIdQuery } from '../users/userSlice'
import {  useClearCartMutation, useGetCartQuery, useUpdateCartMutation} from './cartSlice'

const CartView = () => {
   const userId = '63ec905b9c1208565a3b4482'
   const {
    data:user
   }  = useGetUserbyIdQuery({userId})
   const  {
    data:Cart,
    isLoading,
    isError,
    error
   } = useGetCartQuery({username:'ADMIN'})
   console.log(Cart?.items)
    const [clearCart] = useClearCartMutation()
    const [createOrder,{isLoading:isCreateOrderLoading}] = useAddNewOrderMutation()
    const [updateCart, {
        isLoading: isUpdateCartLoading
    }] = useUpdateCartMutation()
    const [shippingAddress1,setShippingAddress1] = useState(' ')
    const [shippingAddress2,setShippingAddress2] = useState(' ')
    const [phone,setPhone] = useState(' ')
    const [email,setEmail] = useState(' ')
    const [username,setUsername] = useState(' ')
    const [pincode,setPincode] = useState(' ')
    const [totalPrice,setTotalPrice] = useState(0)
    useEffect(()=>{
      setUsername(user?.username ?? ' ')
      setShippingAddress1(user?.addressLine1 ?? ' ')
      setShippingAddress2(user?.addressLine2 ?? ' ')
      setPhone(user?.phone ?? ' ')
      setEmail(user?.email ?? ' ')
      
    },[user])
    useEffect (()=>{
      console.log(Cart?.itemObjects)
      if (Cart?.itemObjects?.length){
        const totalPriceNew =  Array.from(Cart?.itemObjects)?.reduce((total,value)=>{
            
                    return {...total,itemname:'Total',cartQuantity:1,price:total?.price*total?.cartQuantity+value?.price*value?.cartQuantity}
                  }).price
        console.log(totalPriceNew)
        setTotalPrice(totalPriceNew)
      }

    },[Cart])
    const handleUpdateQuantity = async({itemId,newQuantity}) => {
      const status = await updateCart({username:user?.username,itemId,newQuantity})
      if (status?.error){
        
      }
    }
    
    const handleCheckOut = ()=>{
        
        createOrder({   

            "items": Cart?.itemObjects?.map(item=>{return {"id":item._id, "ordQty":item.cartQuantity}}),
            "user": userId,
            "shippingName": username,
            "shippingAddress1": shippingAddress1,
            "shippingAddress2": shippingAddress2,
            "shippingPinCode": pincode,
            "shippingPhone": phone,
            "shippingEmail":email,
            totalPrice
        })
        clearCart({username:user?.username})
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
      content =  Cart?.items.length > 0 ?    <div className='cart-main-container'>
        
        {/* <button onClick={() => addNewCart({username:'ADMIN'})}> Create Cart</button> */}
        {/* <button onClick={() => clearCart({username:'ADMIN'})}> Clear Cart</button>
        <button onClick={() => updateCart({username:'ADMIN',itemId:1001,newQuantity:4})}> Update Cart</button> */}
        <div className='cart-items-container'>
          <h2>Cart</h2>
          {Cart?.itemObjects?.map(item =>{
            return ( 
              <li className='cart-items' key={item._id}> 
                <div className='cart-image-container'>
                  {item.images.map((image,i) => {
                    return <img key={i} className='item-image' src={image} alt='Not Loaded'></img>
                  })}
                  
                </div>
                <div >
                  <h4>{item.itemname}</h4>
                  <p>{item.price}₹ </p>
                </div>
                <div className='cart-quantity-controller' >

                  <input type={'number'} defaultValue={item.cartQuantity} 
                  onChange={(e)=>e.target.value>item.inventory? e.target.value=item.inventory:e.target.value}
                    min='1' max={item.inventory} 
                    onBlur={(e) => handleUpdateQuantity({itemId:item.itemId,newQuantity:e.target.value})}>
                    
                    </input>
                </div>
                <div className='cart-image-container'>
                  <button  onClick={(e) => handleUpdateQuantity({itemId:item.itemId,newQuantity:0})} className='cart-item-delete-button'>{<FontAwesomeIcon icon={faTrash}/>}</button>
                </div>
              </li>
            )
          }) 
          }
          <div>
            
          </div>
        </div>
        <div className='shipping-form'>
          <h2>Shipping Address</h2>
          <div className='form-input-container'>
            <label htmlFor='name'>Name</label>
            <input value={username} onChange={(e) =>setUsername(e.target.value)} id='name'></input>
          </div>
          <div className='form-input-container'>
            <label  htmlFor='address1'>Address Line 1</label>
            <input value={shippingAddress1} onChange={(e) =>setShippingAddress1(e.target.value)} required id='address1'></input>
          </div>
          <div className='form-input-container'>
            <label htmlFor='address2'>Address Line 2</label>
            <input value={shippingAddress2} onChange={(e) =>setShippingAddress2(e.target.value)} id='address2'></input>
          </div>
          <div className='form-input-container'>
            <label htmlFor='pincode'>Pin Code</label>
            <input value={pincode} onChange={(e) =>setPincode(e.target.value)} id='pincode'></input>
          </div>
          <div className='form-input-container'>
            <label htmlFor='phone'>Phone</label>
            <input value={phone} onChange={(e) =>setPhone(e.target.value)} required type={'phone'} id='phone'></input>
          </div>
          <div className='form-input-container'>
            <label htmlFor='email'>Email</label>
            <input value={email} onChange={(e) =>setEmail(e.target.value)} type={'email'} id='email'></input>
          </div>
          <div className='cart-btns'>
            <button className='clear-cart-button' onClick={()=>clearCart({username:user?.username})} >Clear Cart</button>

            <button className='checkout-button' disabled={isUpdateCartLoading} onClick={handleCheckOut}>{(!isUpdateCartLoading||!isCreateOrderLoading) ? 'CheckOut':<FontAwesomeIcon icon={faHourglass}/>}</button>
          </div>


        </div>
        <div>
           {<p>Total: {totalPrice}₹</p>}
        </div>

    </div> : (
      <div className='no-item-container '>
          <div className='flex-center-column'>
            <FontAwesomeIcon icon={faSadTear}  size='3x'/>
            <p>No Items to Checkout</p>
          </div>
        </div>
        )
    }
   

  return (
    content
  )
  }

export default CartView
