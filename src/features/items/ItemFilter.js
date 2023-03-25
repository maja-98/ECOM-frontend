import { faCaretDown, faCaretUp, faDotCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { selectSearchCategory, selectSearchColor, selectSearchPrice, selectSearchSize, selectSort, setSearch } from './itemSearchSlice'

const ItemFilter = () => {
    const dispatch = useDispatch()
  const [colorDropDown,setColorDropDown] = useState(false)
  const [categoriesDropDown,setCategoriesDropDown] = useState(false)
  const [priceDropDown,setPriceDropDown] = useState(false)
  const [sizeDropDown,setSizeDropDown] = useState(false)
  const [sortDropDown,setSortDropDown] = useState(false)
  const searchColor = useSelector(selectSearchColor)
  const searchPrice = useSelector(selectSearchPrice)
  const searchCategory = useSelector(selectSearchCategory)
  const searchSize = useSelector(selectSearchSize)
  const sort = useSelector(selectSort)
  const {role} = useAuth()

  return (
        <div className='filter-container'>
          <div className='filter-list'>
            <div className='filter'>
                <button className='filter-btn' onClick={()=>setColorDropDown(prev=>!prev)}>Color {colorDropDown ? <FontAwesomeIcon icon={faCaretUp} size='sm'/> : <FontAwesomeIcon icon={faCaretDown} size='sm'/>}</button>
                {colorDropDown && <div className='hidden-filters'>
                    <p onClick={() =>dispatch(setSearch({searchColor:'Black'}))}>Black {searchColor.includes('Black') && <FontAwesomeIcon icon={faDotCircle} size='xs'/>}</p>
                    <p onClick={() =>dispatch(setSearch({searchColor:'Blue'}))}>Blue {searchColor.includes('Blue') && <FontAwesomeIcon icon={faDotCircle} size='xs'/>}</p>
                    <p onClick={() =>dispatch(setSearch({searchColor:'White'}))}>White {searchColor.includes('White') && <FontAwesomeIcon icon={faDotCircle} size='xs'/>}</p>
                </div>}

            </div>
            <div className='filter'>
                <button className='filter-btn' onClick={()=>setPriceDropDown(prev=>!prev)}>Price {priceDropDown ? <FontAwesomeIcon icon={faCaretUp} size='sm'/> : <FontAwesomeIcon icon={faCaretDown} size='sm'/>}</button>

                {priceDropDown && <div className='hidden-filters'>
                    <p onClick={() =>dispatch(setSearch({searchPrice:'500'}))}>{'<500'} {searchPrice.includes('500') && <FontAwesomeIcon icon={faDotCircle} size='xs'/>}</p>
                    <p onClick={() =>dispatch(setSearch({searchPrice:'1000'}))}>500-1000 {searchPrice.includes('1000') && <FontAwesomeIcon icon={faDotCircle} size='xs'/>}</p>
                    <p onClick={() =>dispatch(setSearch({searchPrice:'1500'}))}>1000-1500 {searchPrice.includes('1500') && <FontAwesomeIcon icon={faDotCircle} size='xs'/>}</p>
                    <p onClick={() =>dispatch(setSearch({searchPrice:'2000'}))}>1500-2000 {searchPrice.includes('2000') && <FontAwesomeIcon icon={faDotCircle} size='xs'/>}</p>
                </div>}
            </div>
            <div className='filter'>
                <button className='filter-btn' onClick={()=>setSizeDropDown(prev=>!prev)}>Size {sizeDropDown ? <FontAwesomeIcon icon={faCaretUp} size='sm'/> : <FontAwesomeIcon icon={faCaretDown} size='sm'/>}</button>

                {sizeDropDown && <div className='hidden-filters'>
                    <p onClick={() =>dispatch(setSearch({searchSize:'XL'}))}>XL {searchSize.includes('XL') && <FontAwesomeIcon icon={faDotCircle} size='xs'/>}</p>
                    <p onClick={() =>dispatch(setSearch({searchSize:'L'}))}>L {searchSize.includes('L') && <FontAwesomeIcon icon={faDotCircle} size='xs'/>}</p>
                    <p onClick={() =>dispatch(setSearch({searchSize:'M'}))}>M {searchSize.includes('M') && <FontAwesomeIcon icon={faDotCircle} size='xs'/>}</p>
                    <p onClick={() =>dispatch(setSearch({searchSize:'S'}))}>S {searchSize.includes('S') && <FontAwesomeIcon icon={faDotCircle} size='xs'/>}</p>
                </div>}
            </div>
            <div className='filter lg-none'>
                <button className='filter-btn' onClick={()=>setCategoriesDropDown(prev=>!prev)}>Categories {categoriesDropDown ? <FontAwesomeIcon icon={faCaretUp} size='sm'/> : <FontAwesomeIcon icon={faCaretDown} size='sm'/>}</button>

                {categoriesDropDown && <div className='hidden-filters'>
                    <p onClick={() =>dispatch(setSearch({searchCategory:''}))}>All {searchCategory==='' && <FontAwesomeIcon icon={faDotCircle} size='xs'/>}</p>
                    <p onClick={() =>dispatch(setSearch({searchCategory:'Shirt'}))}>Shirt {searchCategory==='Shirt' && <FontAwesomeIcon icon={faDotCircle} size='xs'/>}</p>
                    <p onClick={() =>dispatch(setSearch({searchCategory:'Pant'}))}>Pant {searchCategory==='Pant' && <FontAwesomeIcon icon={faDotCircle} size='xs'/>}</p>
                    <p onClick={() =>dispatch(setSearch({searchCategory:'Cap'}))}>Cap {searchCategory==='Cap' && <FontAwesomeIcon icon={faDotCircle} size='xs'/>}</p>
                </div>}
            </div>
            {role==='Admin' && <div className='filter'>
                <Link to={'/add'} className='filter-btn link-addon' >Add Item </Link>
            </div>}
          </div>
          <div className='filter'>
            <button onClick={()=>setSortDropDown(prev=>!prev)} className='filter-btn'>Sort {sortDropDown ? <FontAwesomeIcon icon={faCaretUp} size='sm'/> : <FontAwesomeIcon icon={faCaretDown} size='sm'/>}</button>
            

            {sortDropDown && <div className='hidden-filters'>
                <p onClick={() =>dispatch(setSearch({sort:'PriceUp'}))}>Price ↑ {sort==='PriceUp' && <FontAwesomeIcon icon={faDotCircle} size='xs'/>}</p>
                <p onClick={() =>dispatch(setSearch({sort:'PriceDown'}))}>Price ↓ {sort==='PriceDown' && <FontAwesomeIcon icon={faDotCircle} size='xs'/>}</p>
            </div>}
          </div>
          
        </div>
  )
}

export default ItemFilter
