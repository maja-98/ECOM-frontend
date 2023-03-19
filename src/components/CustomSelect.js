import React from 'react'

const CustomSelect = ({handleSetState,valueList,currentState}) => { 
  return (
    <div className='add-item-select-box' >
        {valueList.map(val=>{
           return  <li key={val} className={`select-list ${currentState.includes(val)?'selected-line':''}`} onClick={()=>handleSetState(val)}>{val}</li>
        })} 
    </div>
  )
}

export default CustomSelect
