import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useAddNewOrderMutation } from '../orders/orderSlice'
import {  useGetCartQuery} from './cartSlice'

const CartView = () => {
   const  {
    data:Cart
   } = useGetCartQuery({username:'ADMIN'})
    // const [updateCart] = useUpdateCartMutation()
    // const [clearCart] = useClearCartMutation()
    const [createOrder] = useAddNewOrderMutation()
   

  return (
    <div className='cart-main-container'>
        
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
            <input id='name'></input>
          </div>
          <div className='form-input-container'>
            <label  htmlFor='address1'>Address Line 1</label>
            <input required id='address1'></input>
          </div>
          <div className='form-input-container'>
            <label htmlFor='address2'>Address Line 2</label>
            <input id='address2'></input>
          </div>
          <div className='form-input-container'>
            <label htmlFor='phone'>Phone</label>
            <input required type={'phone'} id='phone'></input>
          </div>
          <div className='form-input-container'>
            <label htmlFor='email'>Email</label>
            <input type={'email'} id='email'></input>
          </div>
          <div className='cart-btns'>
            <button className='clear-cart-button' >Clear Cart</button>

            <button className='checkout-button' onClick={() => createOrder({   
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
        })}>CheckOut</button>
          </div>


        </div>

    </div>
  )
}

export default CartView
