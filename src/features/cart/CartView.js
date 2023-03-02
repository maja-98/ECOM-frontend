import { faSadTear, faSpinner, faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useAddNewOrderMutation } from '../orders/orderSlice'
import { useGetUserbyIdQuery } from '../users/userSlice'
import {  useClearCartMutation, useGetCartQuery} from './cartSlice'

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
    // const [updateCart] = useUpdateCartMutation()
    const [clearCart] = useClearCartMutation()
    const [createOrder] = useAddNewOrderMutation()
    const [shippingAddress1,setShippingAddress1] = useState(' ')
    const [shippingAddress2,setShippingAddress2] = useState(' ')
    const [phone,setPhone] = useState(' ')
    const [email,setEmail] = useState(' ')
    const [username,setUsername] = useState(' ')

    useEffect(()=>{
      setUsername(user?.username ?? ' ')
      setShippingAddress1(user?.addressLine1 ?? ' ')
      setShippingAddress2(user?.addressLine2 ?? ' ')
      setPhone(user?.phone ?? ' ')
      setEmail(user?.email ?? ' ')
      
    },[user])
    const handleCheckOut = ()=>{
        createOrder({   
            "items": [
                {"Id":"63ecb50778a76cc8b5882dc0",
                "ordQty":24},
                      {"Id":"63ee37b1fed1c430383cf9fd",
                "ordQty":2}
            ],
            "user": "63ee3e87fed1c430383cfa5d",
            "shippingName": "MAJAKKA",
            "shippingAddress1": "KERALA",
            "shippingAddress2": "INDIA",
            "shippingPinCode": "58585",
            "shippingPhone": "78987812325"
        })
        clearCart({username:user?.username})}
   

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
                </div>
                <div className='cart-quantity-controller' >

                  <input type={'number'} defaultValue={item.cartQuantity} min='1' max={item.inventory}></input>
                </div>
                <div className='cart-image-container'>
                  <button  className='cart-item-delete-button'>{<FontAwesomeIcon icon={faTrash}/>}</button>
                </div>
              </li>
            )
          }) 
          }
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
            <label htmlFor='phone'>Phone</label>
            <input value={phone} onChange={(e) =>setPhone(e.target.value)} required type={'phone'} id='phone'></input>
          </div>
          <div className='form-input-container'>
            <label htmlFor='email'>Email</label>
            <input value={email} onChange={(e) =>setEmail(e.target.value)} type={'email'} id='email'></input>
          </div>
          <div className='cart-btns'>
            <button className='clear-cart-button' onClick={()=>clearCart({username:user?.username})} >Clear Cart</button>

            <button className='checkout-button' onClick={handleCheckOut}>CheckOut</button>
          </div>


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
