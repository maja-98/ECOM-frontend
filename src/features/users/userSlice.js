import { apiSlice } from "../api/apiSlice";

export const extendedUserApiSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers : builder.query({
            query: () => '/users',
            providesTags : (result,error,arg) =>{ 
                return [
                {type:'User',id:'LIST'},...result.map(user=>({type:'User',id:user._id}))
            ]}
        }),


        addNewUser : builder.mutation({
            query: initialUserData => ({
                url : '/users',
                method: 'POST',
                body:{
                    ...initialUserData
                }

            }),
            invalidatesTags : [ {type:'User',id:'LIST'}]
        }),

        updateUser : builder.mutation({
             query: initialUserData => ({
                url : '/users',
                method: 'PATCH',
                body:{
                    ...initialUserData
                }
            })   ,
            invalidatesTags :(result,error,arg) => [ {type:'User',id:arg.id}]      
        }),

        deleteUser : builder.mutation({
             query: ({id}) => ({
                url : '/users',
                method: 'DELETE',
                body:{
                    id
                }

            })   ,
            invalidatesTags :(result,error,arg) =>  [ {type:'User',id:arg.id}]          
        }),
          
    })
})

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
 } = extendedUserApiSlice