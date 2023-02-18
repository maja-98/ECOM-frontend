import React from 'react'
import { useGetOrderbyUserIdQuery } from './orderSlice'

const OrderList = () => {

    const {
        data:Orders
    } = useGetOrderbyUserIdQuery({userId:'63ee3e87fed1c430383cfa5d'})
  return (
    <div>
      <h1>Orders</h1>
      {Orders?.map( order => {
        return  <div key={order._id}>
            
            <h3>{order.orderId}</h3>
            {order.items.map(item => {
                return <li key={item._id}>{item.itemname} {item.ordQty} </li>
            })}
            <h4>{order.totalPrice} Rs</h4>
        </div>
      }
      )}
    </div>
  )
}

export default OrderList
