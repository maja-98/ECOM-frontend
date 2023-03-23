import { createSlice } from '@reduxjs/toolkit'

const itemSearchSlice = createSlice({
    name:'search',
    initialState: {searchValue: '',searchCategory:'',searchColor:[],searchPrice:[],sort:'',searchSize:[]}    ,
    reducers: {
        
        setSearch: (state,action) => { 

            
            const {searchValue,searchCategory,searchColor,searchPrice,searchSize,sort} = action.payload
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
            if (searchSize && !state.searchSize.includes(searchSize)){
                state.searchSize.push(searchSize)
            }
            else if (searchSize){
                state.searchSize = state.searchSize.filter(size => size!==searchSize)
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
export const selectSearchSize  = (state) => state.search.searchSize
export const selectSort  = (state) => state.search.sort