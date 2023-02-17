import React from 'react'
import {useGetMultiItemsMutation } from '../items/itemSlice'
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

   

  return (
    <div>
        <h1>Cart</h1>
        <button onClick={() => addNewCart({username:'ADMIN'})}> Create Cart</button>
        <button onClick={() => clearCart({username:'ADMIN'})}> Clear Cart</button>
        <button onClick={() => updateCart({username:'ADMIN',itemId:1001})}> Update Cart</button>
        <button onClick={() => deleteCart({username:'ADMIN'})}> Delete Cart</button>
        
        {Cart?.itemObjects?.map(item =>{
           return  <li key={item._id}>{item.itemname} {item.cartQuantity} 
           <button onClick={() =>updateCart({itemId:item.itemId, username:"ADMIN",direction:"add"})}>+</button>
           <button onClick={() =>updateCart({itemId:item.itemId, username:"ADMIN",direction:"remove"})}>-</button>
           <h6>{item.itemId}</h6>
           </li>
        }) 
        }
    </div>
  )
}

export default CartView
