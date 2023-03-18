import { faCaretDown, faCaretUp, faSadTear, faSpinner, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import PopUp from '../../components/PopUp'
import useAuth from '../../hooks/useAuth'
import { useGetOrderbyUserIdQuery, useUpdateOrderMutation } from './orderSlice'

const OrderList = () => {
  const [displayOrderDetails,setDisplayOrderDetails] = useState('')
  const [popup,setPopUp] = useState(false)
  const [message,setMessage] = useState('This is a Test Message')
  const [heading,setHeading] = useState('This is Heading')
  const [status,setStatus] = useState('')
  const [searchOrderID,setSearchOrderID] = useState('')
  const [Orders,setOrders] = useState([])

  const handleTogglePopUp = () =>{
    setPopUp((prevState) => !prevState)
  }
  const {userId,role} = useAuth()
    const {
        data:InitialOrders,
        isLoading,
        isError,
        error
    } = useGetOrderbyUserIdQuery({userId})
    useEffect(() => {
      if (InitialOrders){
        const filterStatus = (order) =>  status ? order.status===status : true 
        const filterOrderId = (order) => searchOrderID ?  order.orderId.toString().match(searchOrderID) :true 
        const newOrders = InitialOrders.filter(order => filterStatus(order) && filterOrderId(order))
        if (role==='Admin'){
          newOrders.reverse()
        }
        setOrders(newOrders)
      }
    },[status,searchOrderID,InitialOrders,role])
  const [updateOrderStatus] = useUpdateOrderMutation()
  const handleDisplayOrderDetails =(val)=>{
    setDisplayOrderDetails(prev =>{
      if (prev===val){
        return ''
      }
      else{
        return val
      }
    })
  }
  const handleOrderStatusUpdate = async (Id,orderId,status) => {
    const result = await updateOrderStatus({orderId:Id,status})
    if (result?.error){
      setHeading("Error")

      setMessage(result?.error?.data?.message)
      
    }
    else{
      setHeading("Success")
      setMessage(`Order with ${orderId} ${status}`)
    }
    handleTogglePopUp()
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
  else if (isError){
      content = (
      <div className='no-item-container '>
          <div className='flex-center-column'>
            <FontAwesomeIcon icon={faTriangleExclamation}  size='3x'/>
            <p>Error</p>
            <p>{error.data.message}</p>
          </div>
        </div>
      )
    }
  else{

      content = <div className='order-container  '>
          <h2>Orders</h2>
          {role==='Admin' && <div className='admin-order-container'>
            <input type={'text'} value={searchOrderID} onChange={(e)=>setSearchOrderID(e.target.value)} className='order-filter' placeholder='Order ID'></input>
            <select name="status" id="status" onChange={(e)=>setStatus(e.target.value)}>
              <option value="">All</option>
              <option value="placed">placed</option>
              <option value="Packed">Packed</option>
              <option value="Delivered">Delivered</option>
              <option value="Return Initiated">Return</option>
              <option value="Returned">Returned</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>}
          {Orders?.length===0 ?       <div className='no-item-container '>

          <div className='flex-center-column'>
            <FontAwesomeIcon icon={faSadTear}  size='3x'/>
            <p>No Orders Found</p>
          </div>
        </div> :Orders?.map( order => {
            return <div className='order-wrapper' key={order._id}>
                <div className='single-order-container' >
                  
                  <h3>OrderID: {order.orderId}</h3>
                  <p>{order.status}</p>
                  <p>{ dateFormatter( order.createdAt)}</p>
                  <FontAwesomeIcon onClick={()=>handleDisplayOrderDetails(order.orderId)} icon={displayOrderDetails===order.orderId? faCaretUp:faCaretDown }/>
                  
              </div>
              {displayOrderDetails===order.orderId &&<div className='order-details-container'>
                <div className='order-totalprice-container'>
                  <h4>Total Price: {order.totalPrice}₹</h4>
  
                  
                </div>
                    <div  className='order-items-container'>
                        <p ><b>Item</b></p>
                        <p ><b>Quantity</b></p>
                        <p ><b>Price</b></p>
                    </div>                          
                    {order.items.map(item => {
                    return <div key={item._id} className='order-items-container'>
                          <p >{item.itemname} </p>
                          <p > {item.ordQty} </p>
                          <p >{item.price} ₹</p>
                      </div>
                })}
                {order.status!=='Cancelled' &&<div className='cancel-order-button-container'>
                  {order.status==='placed' && <button onClick={()=>handleOrderStatusUpdate(order._id,order.orderId,'Cancelled')}>Cancel Order</button>}
                  {(order.status==='placed' && role==='Admin') && <button onClick={()=>handleOrderStatusUpdate(order._id,order.orderId,'Packed')}>Packed</button>}
                  {(order.status==='Packed' && role==='Admin') &&  <button onClick={()=>handleOrderStatusUpdate(order._id,order.orderId,'Delivered')}>Delivered</button>}
                  {(order.status==='Delivered') && <button onClick={()=>handleOrderStatusUpdate(order._id,order.orderId,'Return Initiated')}>Return</button>}
                  {(order.status==='Return Initiated' && role==='Admin') && <button onClick={()=>handleOrderStatusUpdate(order._id,order.orderId,'Returned')}>Returned</button>}
                </div>}
                
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
  return (
    <>
    {content}
    {popup && <PopUp  message={message} heading={heading} handleTogglePopUp={handleTogglePopUp}/>}
    </>
    
  )
}

export default OrderList
