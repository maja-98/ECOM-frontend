import { apiSlice } from "../api/apiSlice";

export const extendedOrderApiSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getOrders : builder.query({
            query: () => '/orders',
            providesTags : (result,error,arg) =>{ 
                return [
                {type:'Order',id:'LIST'},...result.map(order=>({type:'Order',id:order._id}))
            ]}
        }),
        getOrderbyUserId : builder.query({
            query: (arg) => {
                console.log(arg)
                return {
                url: `/orders/${arg.userId}`,
                method:'GET',
            }},
            providesTags : (result,error,arg) =>{ 
                return [
                {...result?.map(order=>({type:'Order',id:order._id}))}
            ]}
        }),


        addNewOrder : builder.mutation({
            query: initialOrderData => ({
                url : '/orders',
                method: 'POST',
                body:{
                    ...initialOrderData
                }

            }),
            invalidatesTags : [ {type:'Order',id:'LIST'}]
        }),

        updateOrder : builder.mutation({
             query: initialOrderData => ({
                url : '/orders',
                method: 'PATCH',
                body:{
                    ...initialOrderData
                }
            })   ,
            invalidatesTags :(result,error,arg) => [ {type:'Order',id:arg.id}]      
        })
          
    })
})

export const {
    useGetOrdersQuery,
    useGetOrderbyUserIdQuery,
    useAddNewOrderMutation,
    useUpdateOrderMutation
 } = extendedOrderApiSlice