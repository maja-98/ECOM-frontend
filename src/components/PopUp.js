import React, { useEffect } from 'react'

const PopUp = ({type,heading,message,handleTogglePopUp}) => {
  console.log(type)
  useEffect(()=>{
    if(type==='notification'){
      setTimeout(()=>{
        handleTogglePopUp()
      },3000)
    }
  },[type,handleTogglePopUp])
  let content;
  if (type==='overlay'){
    
        content = <div className='popup-overlay'>
            <div className='overlay-message-container'>
              <h1 className='overlay-message-head'>{heading}</h1>
              <div className='overlay-message-content-container'>
                <p className='overlay-message-content'>{message}</p>
                <button onClick={handleTogglePopUp} className='overlay-close-button'>Close</button>
              </div>
              
            </div>
        </div>
  }
  else if (type==='notification'){
    content = <div className='notification-container'>
        <p>{message}</p>
    </div>
  }
  return (
    content
  )
}

export default PopUp
