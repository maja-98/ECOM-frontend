import { apiSlice } from "../api/apiSlice";

export const extendedItemApiSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getItems : builder.query({
            query: () => '/items',
            providesTags : (result,error,arg) =>{ 
                return [
                {type:'Item',id:'LIST'},...result.map(item=>({type:'Item',id:item._id}))
            ]}
        }),

        getItemsbyItemId : builder.query({
            query: (arg) => {
                console.log(arg.itemId)
                return {
                url: `/items/${arg.itemId}`,
                method:'GET',
            }},
            providesTags: (result,error,arg) => [{type:'Item',id:result._id}]
        }),
        getMultiItems : builder.mutation({
            query: ({itemIds}) => ({
                url : '/items/multi',
                method: 'POST',
                body:{
                    itemIds
                }

            })
        }),
        addNewItem : builder.mutation({
            query: initialItemData => ({
                url : '/items',
                method: 'POST',
                body:{
                    ...initialItemData
                }

            }),
            invalidatesTags : [ {type:'Item',id:'LIST'}]
        }),

        updateItem : builder.mutation({
             query: initialItemData => ({
                url : '/items',
                method: 'PATCH',
                body:{
                    ...initialItemData
                }
            })   ,
            invalidatesTags :(result,error,arg) => [ {type:'Item',id:arg.id}]      
        }),

        deleteItem : builder.mutation({
             query: ({id}) => ({
                url : '/items',
                method: 'DELETE',
                body:{
                    id
                }

            })   ,
            invalidatesTags :(result,error,arg) =>  [ {type:'Item',id:arg.id}]          
        }),
          
    })
})

export const {
    useGetItemsQuery,
    useGetItemsbyItemIdQuery,
    useAddNewItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
    useGetMultiItemsMutation
 } = extendedItemApiSlice