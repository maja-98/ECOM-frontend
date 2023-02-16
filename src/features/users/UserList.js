import React from 'react'
import { useAddNewUserMutation, useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from './userSlice'

const UserList = () => {
   const  {
    data:Users,
      isLoading,
      isSuccess,
      isError,
      error
   } = useGetUsersQuery()
    const [addNewUser] = useAddNewUserMutation()
    const [updateUser] = useUpdateUserMutation()
    const [deleteUser] = useDeleteUserMutation()
    
  return (
    <div>
      <button onClick={()=>addNewUser({username:'Test User Delete',password:'1234',phone:'8128312311'})}>Add User</button>
      <button onClick={()=>updateUser({id:"63ec90999c1208565a3b448b",username:'USER change'})}>Update User</button>
      {Users?.map(user => <h3 key={user._id}>{user.username} <button onClick={() => deleteUser({id:user._id})}>{user._id}</button></h3>)}
    </div>
  )
}

export default UserList
