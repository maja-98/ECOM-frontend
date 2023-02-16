import React from 'react'
import { useAddNewItemMutation, useDeleteItemMutation, useGetItemsbyItemIdQuery, useGetItemsQuery, useUpdateItemMutation } from './itemSlice'

const ItemList = () => {
   const  {
    data:Items,
      isLoading,
      isSuccess,
      isError,
      error
   } = useGetItemsQuery()
    const [addNewItem] = useAddNewItemMutation()
    const [updateItem] = useUpdateItemMutation()
    const [deleteItem] = useDeleteItemMutation()
    
  return (
    <div>
      <button onClick={()=>addNewItem({itemname:'Test New New New Item 2',price:232,category:'Maxi',brand:'Mehar'})}>Add Item</button>
      <button onClick={()=>updateItem({id:"63ee3bd0fed1c430383cfa3f",itemname:'Test Updated 3 Item',price:232,category:'Maxi',brand:'Mehar'})}>Update Item</button>
      <button onClick={()=>deleteItem({id:"63ee3a7afed1c430383cfa15",itemname:'Test Item',price:232,category:'Maxi',brand:'Mehar'})}>Delete Item</button>
      {Items?.map(item => <h3 key={item._id}>{item.itemname} <button onClick={() => deleteItem({id:item._id})}>{item._id}</button></h3>)}
    </div>
  )
}

export default ItemList
