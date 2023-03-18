import { faCaretDown, faDotCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSearchColor, selectSearchPrice, selectSort, setSearch } from './itemSearchSlice'

const ItemFilter = () => {
    const dispatch = useDispatch()
  const [colorDropDown,setColorDropDown] = useState(false)
  const [priceDropDown,setPriceDropDown] = useState(false)
  const [sortDropDown,setSortDropDown] = useState(false)
  const searchColor = useSelector(selectSearchColor)
  const searchPrice = useSelector(selectSearchPrice)
  const sort = useSelector(selectSort)

  return (
        <div className='filter-container'>
          <div className='filter-list'>
            <div className='filter'>
                <button className='filter-btn' onClick={()=>setColorDropDown(prev=>!prev)}>Color <FontAwesomeIcon icon={faCaretDown} size='sm'/></button>
                {colorDropDown && <div className='hidden-filters'>
                    <p onClick={() =>dispatch(setSearch({searchColor:'Black'}))}>Black {searchColor.includes('Black') && <FontAwesomeIcon icon={faDotCircle} size='xs'/>}</p>
                    <p onClick={() =>dispatch(setSearch({searchColor:'Blue'}))}>Blue {searchColor.includes('Blue') && <FontAwesomeIcon icon={faDotCircle} size='xs'/>}</p>
                </div>}

            </div>
            <div className='filter'>
                <button className='filter-btn' onClick={()=>setPriceDropDown(prev=>!prev)}>Price <FontAwesomeIcon icon={faCaretDown} size='sm'/></button>

                {priceDropDown && <div className='hidden-filters'>
                    <p onClick={() =>dispatch(setSearch({searchPrice:'500'}))}>{'<500'} {searchPrice.includes('500') && <FontAwesomeIcon icon={faDotCircle} size='xs'/>}</p>
                    <p onClick={() =>dispatch(setSearch({searchPrice:'1000'}))}>500-1000 {searchPrice.includes('1000') && <FontAwesomeIcon icon={faDotCircle} size='xs'/>}</p>
                </div>}
            </div>
          </div>
          <div className='filter'>
            <button onClick={()=>setSortDropDown(prev=>!prev)} className='filter-btn'>Sort <FontAwesomeIcon icon={faCaretDown} size='sm'/></button>
            

            {sortDropDown && <div className='hidden-filters'>
                <p onClick={() =>dispatch(setSearch({sort:'PriceUp'}))}>Price ↑ {sort==='PriceUp' && <FontAwesomeIcon icon={faDotCircle} size='xs'/>}</p>
                <p onClick={() =>dispatch(setSearch({sort:'PriceDown'}))}>Price ↓ {sort==='PriceDown' && <FontAwesomeIcon icon={faDotCircle} size='xs'/>}</p>
            </div>}
          </div>
          
        </div>
  )
}

export default ItemFilter