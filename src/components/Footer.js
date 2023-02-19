import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Footer = () => {
  return (
    <div className='footer-container container'>
      <h6>Customer support: <FontAwesomeIcon icon={faPhone} color='white' size='xs'/> +9192312323</h6>
    </div>
  )
}

export default Footer
