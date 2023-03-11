import { faCaretDown, faCaretUp, faSadTear, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useGetOrderbyUserIdQuery } from './orderSlice'

const OrderList = () => {
  const [displayOrderDetails,setDisplayOrderDetails] = useState('')
  const userId = '63ec905b9c1208565a3b4482'
    const {
        data:Orders,
        isLoading
    } = useGetOrderbyUserIdQuery({userId})
  const handleDisplayOrderDetails =(val)=>{
    setDisplayOrderDetails(val)
  }
  const dateFormatter  = (date) =>{
    const newDate = new Date(date).toLocaleString()
    return newDate
  }
  let content ;
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
  else{
    if (Orders?.length===0){
      content = (
      <div className='no-item-container '>
          <div className='flex-center-column'>
            <FontAwesomeIcon icon={faSadTear}  size='3x'/>
            <p>No Orders Placed</p>
          </div>
        </div>
        )
    }else{
      content = <div className='order-container  '>
          <h2>Orders</h2>
          {Orders?.map( order => {
            return <div className='order-wrapper' key={order._id}>
                <div className='single-order-container' >
                  
                  <h3>OrderID: {order.orderId}</h3>
                  <p>{order.status}</p>
                  <p>{ dateFormatter( order.createdAt)}</p>
                  <FontAwesomeIcon onClick={()=>handleDisplayOrderDetails(order.orderId)} icon={faCaretDown}/>
                  
              </div>
              {displayOrderDetails===order.orderId &&<div className='order-details-container'>
                <div className='order-totalprice-container'>
                  <h4>Total Price: {order.totalPrice}₹</h4>
  
                  <FontAwesomeIcon  onClick={()=>handleDisplayOrderDetails('')} icon={faCaretUp}/>
                </div>
                    <div  className='order-items-container'>
                                                      <p >Item </p>
                                                      <p > Quantity </p>
                                                      <p >Price</p>
                                                  </div>                          
                    {order.items.map(item => {
                    return <div key={item._id} className='order-items-container'>
                          <p >{item.itemname} </p>
                          <p > {item.ordQty} </p>
                          <p >{item.price} ₹</p>
                      </div>
                })}

              </div>}
              {displayOrderDetails===order.orderId && <div className='order-ship-address-container'>
                            <h6>Shipping Address</h6>
                            
                            <p>Name: {order.shippingName.trim()}</p>
                            <p>Address 1: {order.shippingAddress1.trim()}</p>
                            <p>Address 2: {order.shippingAddress2.trim()}</p>

                            <p>Pincode: {order.shippingPinCode.trim()}</p>
                            <p>Phone: {order.shippingPhone.trim()}</p>
                            <p>Email: {order.shippingEmail.trim()}</p>
              </div>}
            </div>
          }
          )}
      </div>
    }
  }
  return (
    content
  )
}

export default OrderList
