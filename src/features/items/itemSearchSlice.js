import { createSlice } from '@reduxjs/toolkit'

const itemSearchSlice = createSlice({
    name:'search',
    initialState: {searchValue: '',searchCategory:'',searchColor:[],searchPrice:[],sort:''}    ,
    reducers: {
        setSearch: (state,action) => {   
            const {searchValue,searchCategory,searchColor,searchPrice,sort} = action.payload
            state.searchValue = searchValue ?? state.searchValue
            state.searchCategory = searchCategory ?? state.searchCategory
            if (searchColor && !state.searchColor.includes(searchColor)){
                state.searchColor.push(searchColor)
            }
            else if (searchColor){
                state.searchColor = state.searchColor.filter(color => color!==searchColor)
            }
            if (searchPrice && !state.searchPrice.includes(searchPrice)){
                state.searchPrice.push(searchPrice)
            }
            else if (searchPrice){
                state.searchPrice = state.searchPrice.filter(price => price!==searchPrice)
            }

            state.sort = sort ?? state.sort
        }
    }
})

export const { setSearch} = itemSearchSlice.actions
export default itemSearchSlice.reducer
export const selectSearchValue  = (state) => state.search.searchValue
export const selectSearchCategory  = (state) => state.search.searchCategory
export const selectSearchColor  = (state) => state.search.searchColor
export const selectSearchPrice  = (state) => state.search.searchPrice
export const selectSort  = (state) => state.search.sort