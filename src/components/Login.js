import React, { useEffect, useState } from 'react'
import { setCredentials } from '../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { useLoginMutation,useSendLogoutMutation } from '../features/auth/authAPISlice'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useAddNewUserMutation } from '../features/users/userSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import PopUp from './PopUp'
import usePersist from '../hooks/usePersist'


const Login = ({handleLoginView}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {username:usernameFromAuth} = useAuth()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [signupForm,setSignupForm] = useState(false)
    const [usernameNew, setUsernameNew] = useState('')
    const [passwordNew, setPasswordNew] = useState('')
    const [addressLine1, setAddressLine1] = useState('')
    const [addressLine2, setAddressLine2] = useState('')
    const [pincode, setPincode] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [popup,setPopUp] = useState(false)
    const [heading,setHeading] = useState('')
    const [message,setMessage] = useState('')
    const [errorMessage,setErrorMessage] = useState([])
    const [persist,setPersist] = usePersist()

    const [login] = useLoginMutation()
    const [logout] = useSendLogoutMutation()
    const [createUser,{isError,error}] = useAddNewUserMutation()
    const handlePopUpContent = (message,heading) => {
        setHeading(heading)
        setMessage(message)
    }
    const handleTogglePopUp = () =>{
      setPopUp((prevState) => !prevState)
    }
    const handleLogout = async() =>{
      const logOut = await logout()
      if (logOut){
        navigate('/')
      }
    }
    const handleToggle = () => setPersist(prev => !prev)

    const handleCreateUser =async (e) => {
      e.preventDefault()
      const user = await createUser({username:usernameNew,password:passwordNew,addressLine1,addressLine2,pincode,phone})
      if (user?.data?.message!==undefined){
        handlePopUpContent('User Created Successfully','Success')
        setPopUp(true)
        setAddressLine1('')
        setAddressLine2('')
        setPasswordNew('')
        setEmail('')
        setPhone('')
        setPincode('')
        setUsernameNew('')
        setSignupForm(false)
      }
      else{
        setPopUp(true)
      }

      }
    const handleSubmit = async () => {
          try {
              const { accessToken } = await login({ username, password }).unwrap()
              dispatch(setCredentials({ accessToken }))
              setUsername('')
              setPassword('')
              navigate('/')
              handleLoginView()
          } catch (err) {
            
              if (err?.data?.message==='Unauthorized'){
                handlePopUpContent("Invalid Username/Password","Error")
              }else if (err?.error){
                handlePopUpContent ("Service not Available","Error")
              }
              else{
                handlePopUpContent (err.data.message,"Error")
              }
              
              setPopUp(true)
          }
      }
      useEffect(()=>{
        if(isError){
          handlePopUpContent(error.data.message,'Error')

        }
      },[isError,error])
    useEffect(()=>{
      const newArray =[]
      if (!usernameNew || usernameNew.length<4){
        newArray.push('Username of minimum 4 letters required')
      }
      if (!passwordNew || passwordNew.length<8){
        newArray.push('Password greater than 8 Characters required')
      }
      if (!addressLine1 || addressLine1.length<3){
        newArray.push('Valid Address Line1 required')
      }
      if (!phone || isNaN(phone) || phone.length<10){
        newArray.push('Vallid 10 digit Numeric Phone number required')
      }
      if (!pincode ||isNaN(pincode) || pincode.length!==6){
        newArray.push('Valid 6 digit Numeric Pincode required')
      }
      if (newArray.length){
        newArray.push('Fix all above issues to SignUp')
      }
      setErrorMessage(newArray)

    },[phone,usernameNew,passwordNew,addressLine1,pincode])
  let content;
  if (signupForm){
    content = <div className='login-overlay'>
        <form className='login-form' onSubmit={(e) => handleCreateUser(e)}>
          <button className='login-page-close-button' onClick={handleLoginView}><FontAwesomeIcon size='2x'  icon={faClose}/></button>
            <h1>Sign Up</h1>
            <p>Login If you already have an account</p>
            <div className='error-message-container'>
              {errorMessage.map(message=><small key={message} className='error-message'>* {message}</small>)}
            </div>
            
            <input className='login-input signup-input' placeholder='Username' onChange={(e) => setUsernameNew(e.target.value)} value={usernameNew} id='username' type={'text'}></input>         
            
            <input className='login-input signup-input' placeholder='Password' onChange={(e) => setPasswordNew(e.target.value)} type='password' value={passwordNew} id='password' ></input>         
            
            <input className='login-input signup-input' placeholder='Address Line 1'  onChange={(e) => setAddressLine1(e.target.value)} value={addressLine1} id='addressLine1' type={'text'}></input>         
            
            <input className='login-input signup-input' placeholder='Address Line 2' onChange={(e) => setAddressLine2(e.target.value)} value={addressLine2} id='addressLine2' type={'text'}></input>         
            
            <input className='login-input signup-input' placeholder='PinCode'  onChange={(e) => setPincode(e.target.value)}  value={pincode} id='pincode' type={'text'}></input>         
            
            <input className='login-input signup-input' placeholder='Phone' onChange={(e) => setPhone(e.target.value)} type='phone' value={phone} id='phone' ></input>         
    
            <input className='login-input signup-input' placeholder='Email' onChange={(e) => setEmail(e.target.value)} type='email' value={email} id='email' ></input>     
            {!errorMessage.length && <button  type='submit 'className='login-button' >Sign Up</button>}
            <button className='login-button' onClick={()=>setSignupForm(prev=>!prev)}>Login</button>
        </form>
    </div>
  }
  else if (usernameFromAuth){
    content = <div className='login-overlay'>
      <div className='logout-form'>
        <h1 className='username-fromauth'>{usernameFromAuth}</h1>
        <button className='login-page-close-button' onClick={handleLoginView}><FontAwesomeIcon size='2x'  icon={faClose}/></button>
        <button className='login-button' onClick={handleLogout}>Logout</button>
      </div>

    </div>
  }
  else{
    content = <div className='login-overlay'>
                
                <div className='login-form'>
                      <button className='login-page-close-button' onClick={handleLoginView}><FontAwesomeIcon size='2x'  icon={faClose}/></button>
                      <h1>Dubai Pardha Palace</h1>
                      <p>Login/SignUp to use Application</p>
                      <input className='login-input'  placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} id='username' type={'text'}></input>            
                      <input  className='login-input' placeholder='Password' id='password' onChange={(e) => setPassword(e.target.value)} value={password} type={'password'}></input>
                      <button className='login-button' onClick={handleSubmit}>Login</button>
                      <button className='login-button' onClick={()=>setSignupForm(prev=>!prev)}>SignUp</button>  
                      <div className='persist-container'>
                        <input
                                type="checkbox"
                                className="login-checkbox"
                                id="persist"
                                onChange={handleToggle}
                                checked={persist}
                            />
                          <label htmlFor="persist" className="login-persist">
                            Trust This Device
                        </label>
                      </div>  


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

export default Login
