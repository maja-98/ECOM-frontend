import React, { useState } from 'react'
import { setCredentials } from '../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { useLoginMutation,useSendLogoutMutation } from '../features/auth/authAPISlice'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useAddNewUserMutation } from '../features/users/userSlice'


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

    const [login] = useLoginMutation()
    const [logout] = useSendLogoutMutation()
    const [createUser] = useAddNewUserMutation()

    const handleCreateUser =() => {
      createUser({username:usernameNew,password:passwordNew,addressLine1,addressLine2,pincode,phone})
      setSignupForm(false)
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
              console.log(err)
          }
      }
  let content;
  if (signupForm){
    content = <div className='login-overlay'>
            <label htmlFor='username'>Username</label>
            <input onChange={(e) => setUsernameNew(e.target.value)} value={usernameNew} id='username' type={'text'}></input>         
            <label htmlFor='password'>Password</label>
            <input onChange={(e) => setPasswordNew(e.target.value)} type='password' value={passwordNew} id='password' ></input>         
            <label htmlFor='addressLine1'>AddressLine1</label>
            <input onChange={(e) => setAddressLine1(e.target.value)} value={addressLine1} id='addressLine1' type={'text'}></input>         
            <label htmlFor='addressLine2'>AddressLine2</label>
            <input onChange={(e) => setAddressLine2(e.target.value)} value={addressLine2} id='addressLine2' type={'text'}></input>         
            <label htmlFor='pincode'>Pincode</label>
            <input onChange={(e) => setPincode(e.target.value)}  value={pincode} id='pincode' type={'text'}></input>         
            <label htmlFor='phone'>Phone</label>
            <input onChange={(e) => setPhone(e.target.value)} type='phone' value={phone} id='phone' ></input>         
            <label htmlFor='email'>Email</label>
            <input onChange={(e) => setEmail(e.target.value)} type='email' value={email} id='email' ></input>     
            <button onClick={handleCreateUser}>Sign Up</button>    
            <button onClick={()=>setSignupForm(prev=>!prev)}>Login</button>
    </div>
  }
  else if (usernameFromAuth){
    content = <div className='login-overlay'>
      <button onClick={logout}>Logout</button>
      <button onClick={handleLoginView}>Close</button>
    </div>
  }
  else{
    content = <div className='login-overlay'>
      <div className='login-form'>
        <div>
            <label htmlFor='username'>Username</label>
            <input onChange={(e) => setUsername(e.target.value)} value={username} id='username' type={'text'}></input>            
        </div>
        <div>
            <label htmlFor='password'>Password</label>
            <input id='password' onChange={(e) => setPassword(e.target.value)} value={password} type={'password'}></input>
            
        </div>
        <button onClick={()=>setSignupForm(prev=>!prev)}>SignUp</button>
      </div>
      <button onClick={handleLoginView}>Close</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  }
  return (
      content
  )
}

export default Login
