import React, { useEffect } from 'react'

const Test = () => {
    useEffect(()=>{
        console.log('Mounted')
        return () =>{
            console.log('Unmounted')
        }
    },[])
  return (
    <div>
      
    </div>
  )
}

export default Test
