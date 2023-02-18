import React from 'react'
import {useGetMultiItemsMutation } from '../items/itemSlice'
import { useAddNewOrderMutation } from '../orders/orderSlice'
import { useAddNewCartMutation, useClearCartMutation, useDeleteCartMutation, useGetCartQuery, useUpdateCartMutation } from './cartSlice'

const CartView = () => {

   const  {
    data:Cart,
      isLoading,
      isSuccess,
      isError,
      error
   } = useGetCartQuery({username:'ADMIN'})
    const [addNewCart] = useAddNewCartMutation()
    const [updateCart] = useUpdateCartMutation()
    const [deleteCart] = useDeleteCartMutation()
    const [clearCart] = useClearCartMutation()
    const [createOrder] = useAddNewOrderMutation()
   

  return (
    <div>
        <h1>Cart</h1>
        <button onClick={() => addNewCart({username:'ADMIN'})}> Create Cart</button>
        <button onClick={() => clearCart({username:'ADMIN'})}> Clear Cart</button>
        <button onClick={() => updateCart({username:'ADMIN',itemId:1001})}> Update Cart</button>
        <button onClick={() => deleteCart({username:'ADMIN'})}> Delete Cart</button>
        
        {Cart?.itemObjects?.map(item =>{
           return  <li key={item._id}>{item.itemname} {item.cartQuantity} 
           <button onClick={() =>updateCart({itemId:item.itemId, username:"ADMIN",number:2})}>2</button>
           <button onClick={() =>updateCart({itemId:item.itemId, username:"ADMIN",number:0})}>0</button>
           <h6>{item.itemId}</h6>
           </li>
        }) 
        }
        <button onClick={() => createOrder({   
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
  )
}

export default CartView
