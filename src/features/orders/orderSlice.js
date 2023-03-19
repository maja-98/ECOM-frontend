import { apiSlice } from "../api/apiSlice";

export const extendedOrderApiSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getOrders : builder.query({
            query: () => '/orders',
            transformResponse: responseData => {
                const transformedData = responseData.sort((a,b)=>{
                    const dateB = new Date(b.createdAt)
                    const dateA = new Date(a.createdAt)                   
                    if (a.status === "placed" && b.status !== "placed") {
                        return -1; 
                    } else if (a.status !== "placed" && b.status === "placed") {
                        return 1; 
                    } else  {
                        return dateA - dateB; 
                    } 
                    });
                return transformedData
            },
            providesTags : (result,error,arg) =>{ 
                return [
                {type:'Order',id:'LIST'},...result.map(order=>({type:'Order',id:order._id}))
            ]}
        }),
        getOrderbyUserId : builder.query({
            query: (arg) => {
                
                return {
                url: `/orders/${arg.userId}`,
                method:'GET',
            }},
            transformResponse: responseData => {
                const transformedData = (responseData.sort((a,b)=>{
                    const dateB = new Date(b.createdAt)
                    const dateA = new Date(a.createdAt)
                    return dateB-dateA
                }))
                return transformedData
            },
            providesTags : (result,error,arg) =>{ 
                console.log([
                {...result?.map(order=>({type:'Order',id:order._id}))}
            ])
                return [
                {type:'Order',id:'LIST'},...result?.map(order=>({type:'Order',id:order._id}))
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
            invalidatesTags :(result,error,arg) =>{
                console.log({type:'Order',id:arg.orderId})
                return [ {type:'Order',id:arg.orderId}]   
            }    
        })
          
    })
})

export const {
    useGetOrdersQuery,
    useGetOrderbyUserIdQuery,
    useAddNewOrderMutation,
    useUpdateOrderMutation
 } = extendedOrderApiSlice