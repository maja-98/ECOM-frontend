import { faSpinner, faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PopUp from '../../components/PopUp'
import uuid4 from 'uuid4'
import CustomSelect from '../../components/CustomSelect'
import useAuth from '../../hooks/useAuth'
import { uploadToS3 } from '../aws/AWSHandler'
import { useAddNewItemMutation } from './itemSlice'


const AddItem = () => {
    const {role} = useAuth()
    const navigate = useNavigate()
    const [itemname,setItemname] = useState('')
    const [price,setPrice] = useState('')
    const [category,setCategory] = useState('')
    const [brand,setBrand] = useState('')
    const [colors,setColors] = useState([])
    const [images,setImages] = useState([])
    const [inventory,setInventory] = useState([])
    const [sizes,setSizes] = useState([])
    const [popup,setPopup] = useState(false)
    const [message,setMessage] = useState('')
    const [heading,setHeading] = useState('')
    const [loading,setLoading] = useState(false)
    const [createItem] = useAddNewItemMutation()


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
        let imageLocations =[]
        images.forEach( ({file})=>uploadToS3({file}).then(result=>{
          imageLocations.push(result)
        }).catch(err=>console.log(err)))
        setTimeout(async ()=>{
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
        },images.length*2000)
        
      }
    }
    let content;
    if (loading){
      content =    <div className='no-item-container '>
      <div className='flex-center-column'>
        <FontAwesomeIcon icon={faSpinner} spin size='3x'/>
        <p>Creating Item...</p>
      </div>
    </div>
    }else{
    content = role==="Admin" ? <div className='add-item-form'>
        <h2>Add Item</h2>
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
              <option value="Maxi">Maxi</option>
              <option value="Pardha">Pardha</option>
              <option value="Shall">Shall</option>
              <option value="Top">Top</option>
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
            <CustomSelect handleSetState={handleSetSizes} valueList={['XL','XXL','S','M','XS'].sort()} currentState={sizes}/>
          </div>
        </div>
        <div className='add-item-input-num-container'>
          <label className='add-item-label'>Colors</label>
          <div className='add-item-input-subcontainer'>
            <CustomSelect handleSetState={handleSetColors} valueList={['Blue','Black','Green','Maroon'].sort()} currentState={colors}/>
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
              return <div className='add-item-single-image-container' key={image.id}>
                  <img  alt='...' src={image.objectURL}></img>
                  <button><FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteImage(image.id)}/></button>
                </div>
                
            })}
          </div>
        </div>
        <div className='submit-buttons'>
          <button onClick={()=>navigate('/')}>Cancel</button>
          <button onClick={handleSubmitAddItem}>Submit</button>
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
