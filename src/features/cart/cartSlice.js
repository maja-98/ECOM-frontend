import { apiSlice } from "../api/apiSlice";

export const extendedCartApiSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCart : builder.query({
            query: (arg) => {
                
                return {
                url: `/carts/${arg.username}`,
                method:'GET',
            }},
            providesTags : (result,error,arg) =>{ 
                return [
                'Cart'
            ]}
        }),


        addNewCart : builder.mutation({
            query: ({username}) => ({
                url : '/carts',
                method: 'POST',
                body:{
                    username
                }

            }),
            invalidatesTags : [ 'Cart']
        }),

        updateCart : builder.mutation({
             query: initialCartData => ({
                url : '/carts',
                method: 'PATCH',
                body:{
                    ...initialCartData
                }
            })   ,
            invalidatesTags :[ 'Cart']      
        }),
        clearCart : builder.mutation({
             query: ({username}) => ({
                url : '/carts/clear',
                method: 'POST',
                body:{
                    username
                }

            })   ,
            invalidatesTags :['Cart']         
        }),
        deleteCart : builder.mutation({
             query: ({username}) => ({
                url : '/carts',
                method: 'DELETE',
                body:{
                    username
                }

            })   ,
            invalidatesTags :['Cart']         
        }),
          
    })
})

export const {
    useGetCartQuery,
    useAddNewCartMutation,
    useUpdateCartMutation,
    useDeleteCartMutation,
    useClearCartMutation
 } = extendedCartApiSlice