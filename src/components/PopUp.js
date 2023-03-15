import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const PopUp = ({heading,message,handleTogglePopUp}) => {
  

    
  let content = <div className='popup-overlay'>
      <div className='overlay-message-container'>
        <h1 className='overlay-message-head'>{heading}</h1>
        <div className='overlay-message-content-container'>
          <p className='overlay-message-content'>{message}</p>
          <button onClick={handleTogglePopUp} className='login-page-close-button'><FontAwesomeIcon size='2x'  icon={faClose}/></button>
        </div>
        
      </div>
  </div>
  

  return (
    content
  )
}

export default PopUp
