import React from 'react'
import useAuth from '../../hooks/useAuth'

const AddItem = () => {
    const {role} = useAuth()
    let content;
    content = role==="Admin" ? <div>
        Add Item Form
    </div>:<div>UnAuthorized</div>
  return (
   content
  )
}

export default AddItem
