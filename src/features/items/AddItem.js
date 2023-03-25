import { faSpinner, faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PopUp from '../../components/PopUp'
import uuid4 from 'uuid4'
import CustomSelect from '../../components/CustomSelect'
import useAuth from '../../hooks/useAuth'
import { uploadToS3 } from '../aws/AWSHandler'
import { useAddNewItemMutation,useUpdateItemMutation,useDeleteItemMutation } from './itemSlice'


const AddItem = () => {
    const {role} = useAuth()
    const navigate = useNavigate()
    const [item,setItem]= useState(useLocation().state)

    
    const [itemname,setItemname] = useState(item?.itemname??'')
    const [price,setPrice] = useState(item?.price??'')
    const [category,setCategory] = useState(item?.category??'')
    const [brand,setBrand] = useState(item?.brand??'')
    const [colors,setColors] = useState(item?.colors??[])
    const [images,setImages] = useState([])
    const [inventory,setInventory] = useState(item?.inventory??'')
    const [sizes,setSizes] = useState(item?.sizes??[])
    const [popup,setPopup] = useState(false)
    const [message,setMessage] = useState('')
    const [heading,setHeading] = useState('')
    const [loading,setLoading] = useState(false)
    const [createItem] = useAddNewItemMutation()
    const [updateItem] = useUpdateItemMutation()
    const [deleteItem] = useDeleteItemMutation()
    useEffect(()=>{
      if (item?.images?.objectURL===undefined && item){
        const newImages = []
        item?.images.forEach(element => {
          newImages.push({id:uuid4(),objectURL:element})   
        });
        setImages(newImages)
    }},[item])

    const handleTogglePopUp = () =>{
      setPopup((prevState) => !prevState)
    }
    const handleSetColors = (color)=>{

      setColors([color])
    }
    const handleSetSizes = (size)=>{
      
      setSizes([size])
    }
    
    const handleLoadFile = (e)=>{
      const newDict = {id:uuid4(), file:e.target.files[0],objectURL:URL.createObjectURL(e.target.files[0])}
      setImages(prevImages => {
        const newImages = [...prevImages]
        newImages.push(newDict)
        return newImages
      })
    }
    const handleDeleteImage = (id)=>{
      setImages(prevImages=>{
        return prevImages.filter(image=>image.id!==id)
      })
    }

    const handleSubmitAddItem = async()=>{
      setLoading(true)
      if (!itemname || !price || !category || !brand || !images.length){
        setHeading('Failed')
        setMessage('Fill All Mandatory Fields & Try Again')
        setLoading(false)
        setPopup(true)
        
      }else{
          let imageLocations = await Promise.all(images.map(image=>  uploadToS3({file:image.file})))
          const result = await createItem({itemname,price,inventory,images:imageLocations,sizes,colors,category,brand})
          if (result?.data?.message){
            setMessage(result?.data?.message)
            setHeading('Success')
            setItemname('')
            setCategory('')
            setBrand('')
            setPrice('')
            setInventory('')
            setSizes([])
            setColors([])
            setImages([])
          }
          else if (result?.error?.data?.message){
            setMessage(result?.error?.data?.message)
            setHeading('Error')
          
          }
          setLoading(false)
          setPopup(true)  
        }
        
    }
    const handleUpdateItem = async()=>{
      setLoading(true)
      if (!itemname || !price || !category || !brand || !images.length){
        setHeading('Failed')
        setMessage('Fill All Mandatory Fields & Try Again')
        setLoading(false)
        setPopup(true)
        
      }else{
          let imageLocations = await Promise.all(images.map(image=>  {
            if(image.objectURL.slice(0,4)==='blob'){
              return uploadToS3({file:image.file})
            }
            else{
              return image.objectURL
            }
            
          }))
          const result = await updateItem({id:item._id,itemname,price,inventory,images:imageLocations,sizes,colors,category,brand})
          if (result?.data?.message){
            setMessage(result?.data?.message)
            setHeading('Success')
          }
          else if (result?.error?.data?.message){
            setMessage(result?.error?.data?.message)
            setHeading('Error')
          
          }
          setLoading(false)
          setPopup(true)  
        }
        
    }
    const handleDeleteItem =async()=>{
      setLoading(true)
       const result = await deleteItem({id:item._id})
       if (result?.data){
          setMessage(result?.data)
          setHeading('Success')
          setItem(null)
          setItemname('')
          setCategory('')
          setBrand('')
          setPrice('')
          setInventory('')
          setSizes([])
          setColors([])
          setImages([])
       }
       else if (result?.error?.data?.message){
            setMessage(result?.error?.data?.message)
            setHeading('Error')
       }
        setLoading(false)
        setPopup(true)  
    }
    
    let content;
    if (loading){
      content =    <div className='no-item-container '>
      <div className='flex-center-column'>
        <FontAwesomeIcon icon={faSpinner} spin size='3x'/>
        <p>{item ===null ? 'Creating Item...':'Updating Item...'}</p>
      </div>
    </div>
    }else{
    content = role==="Admin" ? <div className='add-item-form'>
        <h2>{item!==null ? 'Edit Item' : 'Add Item'}</h2>
        <div className='add-item-input-container'>
          <label className='add-item-label'>Item Name</label>
          <div className='add-item-input-subcontainer'>
            <input type={'text'} value={itemname} onChange={(e) => setItemname(e.target.value)} className='add-item-input'></input>
            {!itemname && <small className='error-message'>This Field is  Rquired</small>}
          </div>
        </div>
        <div className='add-item-input-container'>
          <label className='add-item-label'>Category</label>
          <div className='add-item-input-subcontainer'>
            <select type={'text'} value={category} onChange={(e) => setCategory(e.target.value)} className='add-item-select'>
              <option value="">Select</option>
              <option value="Cap">Cap</option>
              <option value="Pant">Pant</option>
              <option value="Shirt">Shirt</option>
            </select>
            {!category && <small className='error-message'>This Field is  Required</small>}
          </div>
        </div>
        <div className='add-item-input-container'>
          <label className='add-item-label'>Brand</label>
          <div className='add-item-input-subcontainer'>
            <input type={'text'} value={brand} onChange={(e) => setBrand(e.target.value)} className='add-item-input'></input>
            {!brand && <small className='error-message'>This Field is  Required</small>}
          </div>
        </div>
        <div className='add-item-input-num-container'>
          <label className='add-item-label'>Price</label>
          <div className='add-item-input-subcontainer'>
            <input type={'number'} value={price} onChange={(e) => setPrice(e.target.value)} className='add-item-input'></input>
            {!price && <small className='error-message'>This Field is  Required</small>}
          </div>
        </div>
        <div className='add-item-input-num-container'>
          <label className='add-item-label'>Inventory</label>
          <div className='add-item-input-subcontainer'>
            <input type={'number'} value={inventory} onChange={(e) => setInventory(e.target.value)} className='add-item-input'></input>
            {!inventory && <small className='error-message'>This Field is  Required</small>}
          </div>
        </div>
        <div className='add-item-input-num-container'>
          <label className='add-item-label'>Sizes</label>
          <div className='add-item-input-subcontainer'>
            <CustomSelect handleSetState={handleSetSizes} valueList={['XL','L','S','M'].sort()} currentState={sizes}/>
          </div>
        </div>
        <div className='add-item-input-num-container'>
          <label className='add-item-label'>Colors</label>
          <div className='add-item-input-subcontainer'>
            <CustomSelect handleSetState={handleSetColors} valueList={['Blue','Black','White'].sort()} currentState={colors}/>
          </div>
        </div>
        <div className='add-item-input-image-container'>
          <label className='add-item-label'>Images</label>
          <div className='add-item-input-subcontainer'>
            <input type={'file'} accept="image/*" onChange={(e)=>handleLoadFile(e)}></input>
            {!images.length && <small className='error-message'>Atleast one image is  Required</small>}
          </div>
          <div className='add-items-images-display'>
            {images.map(image=>{
              return <div className='add-item-single-image-container' key={image?.id}>
                  <img  alt='...' src={image?.objectURL}></img>
                  <button><FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteImage(image.id)}/></button>
                </div>
                
            })}
          </div>
        </div>
        <div className='submit-buttons'>
          <button onClick={()=>navigate('/')}>Cancel</button>
          {item !==null &&<button onClick={handleDeleteItem}>Delete Item</button>}
          {item !==null &&<button onClick={handleUpdateItem}>Update</button>}
          {item ===null &&<button onClick={handleSubmitAddItem}>Submit</button>}
        </div>
        
    </div>:   <div className='no-item-container '>
      <div className='flex-center-column'>
        <FontAwesomeIcon icon={faTriangleExclamation}  size='3x'/>
        <p>Error</p>
        <p>UnAuthorized</p>
      </div>
    </div>
    }

  return (
   <>
    {content}
    {popup && <PopUp  message={message} heading={heading} handleTogglePopUp={handleTogglePopUp}/>}
   </>
  )
}

export default AddItem
