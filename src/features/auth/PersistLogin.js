import { Outlet } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from "./authAPISlice"
import usePersist from "../../hooks/usePersist"
import { useSelector } from 'react-redux'
import { selectCurrentToken } from "./authSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
const PersistLogin = () => {

    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)
    
    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(() => {

        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

            const verifyRefreshToken = async () => {
                
                try {
                    await refresh()
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.error(err)
                }
            }

            if (!token && persist) verifyRefreshToken()
        }

        return () => effectRan.current = true

        // eslint-disable-next-line
    }, [])


    let content
    if (!persist) { 
        content = <Outlet />
    } else if (isLoading) {
        
        content =      <div className='no-item-container '>
          <div className='flex-center-column'>
            <FontAwesomeIcon icon={faSpinner} spin size='3x'/>
            <p>Loading...</p>
          </div>
        </div>
    } else if (isError) { 
        
        content = (
      <div className='no-item-container '>
          <div className='flex-center-column'>
            <FontAwesomeIcon icon={faTriangleExclamation}  size='3x'/>
            <p>Error</p>
            <p>{error?.error!==undefined?<p>Service Not Available</p>:<p>{error.data.message}</p>}</p>
          </div>
        </div>
        )
    } else if (isSuccess && trueSuccess) { 
        
        content = <Outlet />
    } else if (token && isUninitialized) { 
        
        
        content = <Outlet />
    }

    return content
}
export default PersistLogin